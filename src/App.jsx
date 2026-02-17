import React from "react";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import GlobalErrorBoundary from "./components/dashboard/ErrorBoundary";

export default function App() {
  return (
    <GlobalErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GlobalErrorBoundary>
  );
}
