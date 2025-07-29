import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // ⏳ Wait 3 seconds before redirecting

    return () => clearTimeout(timer); // Clean up on unmount
  }, [navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Thank you for registering!
      </h2>
      <p className="text-gray-700 mb-6">Redirecting you to login page...</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Login Now
      </button>
    </section>
  );
}
