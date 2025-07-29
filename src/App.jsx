import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/tailwind.css";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Register from "./components/Register";
import ThankYou from "./components/ThankYou";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Layout wrapper
function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/dashboard"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </>
  );
}

// Home page structure
const Home = () => (
  <>
    <Hero />
    <Features />
    <Testimonials />
    <CTA />
    <Contact />
    <Footer />
  </>
);

// Main App component
function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
