import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-items">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
        </div>
        <button className="register-button">Register</button>
      </nav>
      <main>
        <h1>Welcome to My App</h1>
      </main>
    </div>
  );
}

export default App;
