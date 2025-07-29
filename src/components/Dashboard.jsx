// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="p-10 text-center text-xl">
        Not authorized. Please{" "}
        <a className="text-blue-500 underline" href="/login">
          login
        </a>
        .
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome, {user.name}!
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        You're now in the AdBOSS Dashboard 🎉
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
