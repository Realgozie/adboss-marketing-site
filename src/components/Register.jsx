import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError("");
    setEmailExists(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    setEmailExists(false);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login?registered=true");
      } else if (data.message?.toLowerCase().includes("already exists")) {
        setEmailExists(true);
      } else {
        setServerError(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full mb-2 px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-slate-400 transition-colors ${
      hasError ? "border-red-500 focus:ring-red-400" : "border-slate-200 dark:border-slate-700 focus:ring-blue-500"
    }`;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-500 dark:from-slate-950 dark:to-slate-900 p-6 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-transparent dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">Create an account</h2>
        <p className="text-center text-slate-400 dark:text-slate-500 text-sm mb-6">Join AdBOSS and start growing today</p>

        {emailExists && (
          <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm font-semibold px-4 py-3 rounded-xl">
            This email is already registered.{" "}
            <Link to="/login" className="underline font-bold hover:text-amber-900 dark:hover:text-amber-200">
              Please log in instead.
            </Link>
          </div>
        )}

        {serverError && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-semibold px-4 py-3 rounded-xl">
            {serverError}
          </div>
        )}

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass(errors.name)} required />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} required />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass(errors.password)} required />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={`${inputClass(errors.confirmPassword)} mb-4`} required />
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 font-bold transition-all disabled:opacity-60 active:scale-95"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Login</Link>
        </p>
      </form>
    </section>
  );
}
