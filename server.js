import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import registerHandler from "./api/register.js";
import contactHandler from "./api/contact.js";
import loginHandler from "./api/login.js";
import campaignsHandler from "./api/campaigns.js";
import adminHandler from "./api/admin.js";
import teamHandler from "./api/team.js";
import sessionsHandler from "./api/sessions.js";
import twoFAHandler from "./api/2fa.js";
import { forgotPasswordHandler, resetPasswordHandler } from "./api/forgot-password.js";
import verifyEmailHandler from "./api/verify-email.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

// Auth
app.post("/api/register", registerHandler);
app.post("/api/login", loginHandler);
app.get("/api/verify-email", verifyEmailHandler);

// Forgot / Reset password
app.post("/api/forgot-password", forgotPasswordHandler);
app.post("/api/reset-password", resetPasswordHandler);

// Campaigns (per-user)
app.get("/api/campaigns", campaignsHandler);
app.post("/api/campaigns", campaignsHandler);
app.put("/api/campaigns", campaignsHandler);
app.delete("/api/campaigns", campaignsHandler);

// Team (per-user)
app.get("/api/team", teamHandler);
app.post("/api/team", teamHandler);
app.put("/api/team", teamHandler);
app.delete("/api/team", teamHandler);

// Sessions (per-user)
app.get("/api/sessions", sessionsHandler);
app.delete("/api/sessions", sessionsHandler);
app.put("/api/sessions", sessionsHandler);

// Two-Factor Authentication
app.get("/api/2fa", (req, res) => { req._action = "status"; twoFAHandler(req, res); });
app.post("/api/2fa/setup", (req, res) => { req._action = "setup"; twoFAHandler(req, res); });
app.post("/api/2fa/verify", (req, res) => { req._action = "verify"; twoFAHandler(req, res); });
app.post("/api/2fa/disable", (req, res) => { req._action = "disable"; twoFAHandler(req, res); });
app.post("/api/2fa/check", (req, res) => { req._action = "check"; twoFAHandler(req, res); });

// Contact form
app.post("/api/contact", contactHandler);

// Admin
app.get("/api/admin/users", adminHandler);

// Serve frontend
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
