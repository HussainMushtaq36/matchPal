import { useState } from "react";
// CHANGE: Path goes up one level (..) to find assets
import logoMark from "../assets/logo-mark.svg"; 
// CHANGE: Importing the specific CSS file you just created
import "./login.css"; 

export default function Login() { // CHANGE: Renamed from App to Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Login submit", { username, password });
  };

  const handleAdminLogin = () => {
    console.log("Admin login click", { username, password });
  };

  const handleBackToHome = () => {
    console.log("Back to Home click");
  };

  const handleRegister = () => {
    console.log("Register click");
  };

  return (
    <div className="login-wrapper">
      <div className="mobile-container">
        <div className="top-visual-accent">
          <div className="top-gradient" />
          <img
            src={logoMark}
            alt="MatchPal icon"
            className="logo-mark"
          />
          <h1 className="heading-title">MatchPal</h1>
          <p className="heading-subtitle">Find your perfect living space</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="login-form-frame">
          <div className="field-container username-container">
            <label className="field-label">username</label>
            <div className="input-frame username-frame">
              <input
                type="text"
                placeholder="Type here..."
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="field-input"
              />
            </div>
          </div>

          <div className="field-container password-container">
            <label className="field-label">password</label>
            <div className="input-frame password-frame">
              <input
                type="password"
                placeholder="Type here..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="field-input"
              />
            </div>
          </div>

          <button type="submit" className="primary-button login-button">
            Login
          </button>
        </form>

        <button type="button" onClick={handleAdminLogin} className="primary-button admin-button">
          Admin Login
        </button>

        <div className="footer-frame">
          <button type="button" onClick={handleBackToHome} className="home-button">
            Back to Home
          </button>

          <div className="register-frame">
            <p className="register-copy">
              New to the community?
            </p>
            <button type="button" onClick={handleRegister} className="register-link">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}