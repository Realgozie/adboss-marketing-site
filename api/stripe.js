import Stripe from "stripe";
import Database from "@replit/database";

const db = new Database();

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export default async function stripeHandler(req, res) {
  const action = req._stripeAction;

  try {
    if (action === "config") {
      const pubKey = process.env.STRIPE_PUBLISHABLE_KEY || "";
      return res.json({
        publishableKey: pubKey,
        configured: !!process.env.STRIPE_SECRET_KEY,
        prices: {
          growth: {
            monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY || "",
            yearly: process.env.STRIPE_PRICE_GROWTH_YEARLY || "",
          },
          scale: {
            monthly: process.env.STRIPE_PRICE_SCALE_MONTHLY || "",
            yearly: process.env.STRIPE_PRICE_SCALE_YEARLY || "",
          },
        },
      });
    }

    if (action === "checkout") {
      const stripe = getStripe();
      const { priceId, planName, billing, userEmail } = req.body;

      if (!priceId) return res.status(400).json({ error: "priceId is required" });

      const baseUrl = process.env.CUSTOM_DOMAIN
        ? `https://${process.env.CUSTOM_DOMAIN}`
        : process.env.REPLIT_DEPLOYMENT_DOMAIN
        ? `https://${process.env.REPLIT_DEPLOYMENT_DOMAIN}`
        : process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : "http://localhost:5000";

      const sessionParams = {
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${baseUrl}/#/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/#/pricing`,
        metadata: { planName: planName || "", billing: billing || "monthly" },
      };

      if (userEmail) sessionParams.customer_email = userEmail;

      const session = await stripe.checkout.sessions.create(sessionParams);
      return res.json({ url: session.url });
    }

    if (action === "webhook") {
      const stripe = getStripe();
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      let event;
      try {
        if (webhookSecret) {
          event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
          event = JSON.parse(req.body.toString());
        }
      } catch (err) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).json({ error: `Webhook error: ${err.message}` });
      }

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const email = session.customer_details?.email || session.customer_email;
          if (email && session.subscription) {
            const userData = await db.get(`user_${email}`);
            if (userData) {
              const parsed = typeof userData === "string" ? JSON.parse(userData) : userData;
              parsed.stripeCustomerId = session.customer;
              parsed.stripeSubscriptionId = session.subscription;
              parsed.plan = session.metadata?.planName || "Growth";
              parsed.planBilling = session.metadata?.billing || "monthly";
              parsed.planActivatedAt = new Date().toISOString();
              await db.set(`user_${email}`, JSON.stringify(parsed));
            }
          }
          break;
        }
        case "customer.subscription.deleted": {
          const sub = event.data.object;
          const customerId = sub.customer;
          const keys = await db.list("user_");
          for (const key of keys) {
            const raw = await db.get(key);
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed?.stripeCustomerId === customerId) {
              parsed.stripeSubscriptionId = null;
              parsed.plan = "Starter";
              await db.set(key, JSON.stringify(parsed));
              break;
            }
          }
          break;
        }
        case "customer.subscription.updated": {
          const sub = event.data.object;
          const customerId = sub.customer;
          const keys = await db.list("user_");
          for (const key of keys) {
            const raw = await db.get(key);
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed?.stripeCustomerId === customerId) {
              parsed.planStatus = sub.status;
              await db.set(key, JSON.stringify(parsed));
              break;
            }
          }
          break;
        }
      }

      return res.json({ received: true });
    }

    if (action === "subscription") {
      const { email } = req.query;
      if (!email) return res.status(400).json({ error: "email required" });

      const raw = await db.get(`user_${email}`);
      if (!raw) return res.json({ plan: "Starter", subscription: null });

      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      return res.json({
        plan: parsed.plan || "Starter",
        planBilling: parsed.planBilling || "monthly",
        planActivatedAt: parsed.planActivatedAt || null,
        stripeSubscriptionId: parsed.stripeSubscriptionId || null,
        planStatus: parsed.planStatus || null,
      });
    }

    if (action === "portal") {
      const stripe = getStripe();
      const { customerId } = req.body;
      if (!customerId) return res.status(400).json({ error: "customerId required" });

      const baseUrl = process.env.CUSTOM_DOMAIN
        ? `https://${process.env.CUSTOM_DOMAIN}`
        : process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : "http://localhost:5000";

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/#/dashboard`,
      });
      return res.json({ url: portalSession.url });
    }

    return res.status(404).json({ error: "Unknown Stripe action" });
  } catch (err) {
    console.error("Stripe handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
