// src/components/MainLayout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />   {/* Navbar / site header */}
      <main>
        <Outlet /> {/* Page content will go here */}
      </main>
      <Footer />
    </>
  );
}