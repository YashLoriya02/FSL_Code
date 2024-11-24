import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormDemo from "./components/FormDemo";
import About from "./components/About";
import "./index.css";

const App = () => {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormDemo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
