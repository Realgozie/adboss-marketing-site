/**
 * AdBOSS — Stripe Product Seeder
 * ================================
 * Run this once after connecting your Stripe account to create
 * the Growth and Scale products + prices in your Stripe dashboard.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/seed-stripe-products.js
 *
 * After running, copy the printed price IDs into your environment variables:
 *   STRIPE_PRICE_GROWTH_MONTHLY=price_xxx
 *   STRIPE_PRICE_GROWTH_YEARLY=price_xxx
 *   STRIPE_PRICE_SCALE_MONTHLY=price_xxx
 *   STRIPE_PRICE_SCALE_YEARLY=price_xxx
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function seed() {
  console.log("Creating AdBOSS products in Stripe...\n");

  // ── Growth Plan ─────────────────────────────────────────────
  const existingGrowth = await stripe.products.search({ query: "name:'AdBOSS Growth'" });
  let growthProduct;
  if (existingGrowth.data.length > 0) {
    growthProduct = existingGrowth.data[0];
    console.log(`Growth product already exists: ${growthProduct.id}`);
  } else {
    growthProduct = await stripe.products.create({
      name: "AdBOSS Growth",
      description: "For growing teams that need real campaign power and collaboration.",
      metadata: { plan: "Growth" },
    });
    console.log(`Created Growth product: ${growthProduct.id}`);
  }

  const growthMonthly = await stripe.prices.create({
    product: growthProduct.id,
    unit_amount: 4900, // $49.00
    currency: "usd",
    recurring: { interval: "month" },
    nickname: "Growth Monthly",
  });

  const growthYearly = await stripe.prices.create({
    product: growthProduct.id,
    unit_amount: 46800, // $39/mo × 12 = $468
    currency: "usd",
    recurring: { interval: "year" },
    nickname: "Growth Yearly",
  });

  console.log(`  Growth Monthly: ${growthMonthly.id}`);
  console.log(`  Growth Yearly:  ${growthYearly.id}\n`);

  // ── Scale Plan ──────────────────────────────────────────────
  const existingScale = await stripe.products.search({ query: "name:'AdBOSS Scale'" });
  let scaleProduct;
  if (existingScale.data.length > 0) {
    scaleProduct = existingScale.data[0];
    console.log(`Scale product already exists: ${scaleProduct.id}`);
  } else {
    scaleProduct = await stripe.products.create({
      name: "AdBOSS Scale",
      description: "For agencies and high-volume advertisers who need full control.",
      metadata: { plan: "Scale" },
    });
    console.log(`Created Scale product: ${scaleProduct.id}`);
  }

  const scaleMonthly = await stripe.prices.create({
    product: scaleProduct.id,
    unit_amount: 14900, // $149.00
    currency: "usd",
    recurring: { interval: "month" },
    nickname: "Scale Monthly",
  });

  const scaleYearly = await stripe.prices.create({
    product: scaleProduct.id,
    unit_amount: 142800, // $119/mo × 12 = $1,428
    currency: "usd",
    recurring: { interval: "year" },
    nickname: "Scale Yearly",
  });

  console.log(`  Scale Monthly: ${scaleMonthly.id}`);
  console.log(`  Scale Yearly:  ${scaleYearly.id}\n`);

  // ── Summary ─────────────────────────────────────────────────
  console.log("=".repeat(60));
  console.log("Add these to your environment variables:\n");
  console.log(`STRIPE_PRICE_GROWTH_MONTHLY=${growthMonthly.id}`);
  console.log(`STRIPE_PRICE_GROWTH_YEARLY=${growthYearly.id}`);
  console.log(`STRIPE_PRICE_SCALE_MONTHLY=${scaleMonthly.id}`);
  console.log(`STRIPE_PRICE_SCALE_YEARLY=${scaleYearly.id}`);
  console.log("=".repeat(60));
}

seed().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
