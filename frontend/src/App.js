import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenteeLogin from "./components/menteelogin"
import MentorLogin from "./components/mentorlogin";
import "./App.css"; // Optional global styles

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">

              <Link to="/mentorlogin"></Link>
           
              <Link to="/menteelogin"></Link>
           
          
        </nav>
        <Routes>
          <Route path="/mentorlogin" element={<MentorLogin />} />
          <Route path="/menteelogin" element={<MenteeLogin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Mentor Guide</h1>
      <p>Choose whether you're a mentor or mentee to proceed.</p>
    </div>
  );
}

export default App;
