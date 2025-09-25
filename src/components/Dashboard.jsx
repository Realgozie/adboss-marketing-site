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
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AdBOSS</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* ✅ Dashboard Content */}
      <main className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user.name}! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          You’re logged in with{" "}
          <span className="font-medium">{user.email}</span>.
        </p>

        {/* ✅ Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {/* ✅ Placeholder for future features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-gray-600">Manage your preferences here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
