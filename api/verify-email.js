import Database from "@replit/database";

const db = new Database();

export default async function handler(req, res) {
  const { token, email } = req.query;
  if (!token || !email) {
    return res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2 style="color:#ef4444;">Invalid verification link.</h2>
      <a href="/">Go to AdBOSS</a></body></html>`);
  }

  const normalEmail = decodeURIComponent(email).toLowerCase().trim();

  try {
    const userData = await db.get("users");
    const users = Array.isArray(userData) ? userData : (userData?.value || []);
    const user = users.find((u) => u.email === normalEmail);

    if (!user || user.verifyToken !== token) {
      return res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:60px;">
        <h2 style="color:#ef4444;">Invalid or expired verification link.</h2>
        <a href="/">Go to AdBOSS</a></body></html>`);
    }

    if (user.isVerified) {
      return res.redirect("/#/login?verified=already");
    }

    const updated = users.map((u) =>
      u.email === normalEmail ? { ...u, isVerified: true, verifyToken: null } : u
    );
    await db.set("users", updated);

    return res.redirect("/#/login?verified=true");
  } catch (err) {
    console.error("Verify email error:", err);
    return res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2 style="color:#ef4444;">Server error. Please try again.</h2></body></html>`);
  }
}
