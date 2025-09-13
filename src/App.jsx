import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Link to="/about" className="text-blue-600 underline">
        Go to About
      </Link>
    </div>
  );
}

function About() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">About Page</h1>
      <Link to="/" className="text-blue-600 underline">
        Back Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
