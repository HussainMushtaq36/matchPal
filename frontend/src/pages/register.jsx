import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoMark from "../assets/logo-mark.svg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '439px', height: '826px', backgroundColor: '#f9f9ff', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        {/* Header Section */}
        <div style={{ height: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0, 88, 188, 0.1) 0%, rgba(0, 88, 188, 0) 100%)' }}>
          <img src={logoMark} alt="MatchPal" style={{ width: '60px', marginBottom: '15px' }} />
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 'bold', color: '#181c21', margin: 0 }}>Register</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#5e718d', marginTop: '5px' }}>Create your MatchPal account</p>
        </div>

        {/* Form Container */}
        <form style={{ padding: '0 32px', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
             <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#5e718d', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>FIRST NAME</label>
                <input name="firstName" onChange={handleChange} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #d5dde5', padding: '0 10px', boxSizing: 'border-box' }} />
             </div>
             <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#5e718d', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>LAST NAME</label>
                <input name="lastName" onChange={handleChange} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #d5dde5', padding: '0 10px', boxSizing: 'border-box' }} />
             </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '11px', color: '#5e718d', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>EMAIL ADDRESS</label>
            <input name="email" type="email" onChange={handleChange} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #d5dde5', padding: '0 10px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '11px', color: '#5e718d', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>PASSWORD</label>
            <input name="password" type="password" onChange={handleChange} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #d5dde5', padding: '0 10px', boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{ width: '100%', height: '56px', background: '#0058bc', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', marginBottom: '12px', cursor: 'pointer' }}>
            Create Account
          </button>

          <button type="button" onClick={() => navigate("/")} style={{ width: '100%', height: '56px', background: '#e6e8f3', color: '#0058bc', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Back to Login
          </button>
        </form>

      </div>
    </div>
  );
}