// src/components/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const hideHeaderRoutes = ["/dashboard"];

  if (hideHeaderRoutes.includes(location.pathname)) return null;

  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        AdBOSS
      </Link>
      <nav className="space-x-4">
        <Link to="/features" className="text-gray-700 hover:text-blue-600">
          Features
        </Link>
        <Link to="/testimonials" className="text-gray-700 hover:text-blue-600">
          Testimonials
        </Link>
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
