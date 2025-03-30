import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    profilePhoto: null
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (state === "Sign Up" && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (state === "Sign Up" && !formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (state === "Sign Up" && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (state === "Sign Up" && !formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    let url = state === "Login" ? "http://localhost:4000/login" : "http://localhost:4000/signup";
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />
              {errors.username && <p className="error-message">{errors.username}</p>}

              <input name='mobile' value={formData.mobile} onChange={changeHandler} type="text" placeholder="Mobile Number" />
              {errors.mobile && <p className="error-message">{errors.mobile}</p>}

              <input name='address' value={formData.address} onChange={changeHandler} type="text" placeholder="Address" />
              {errors.address && <p className="error-message">{errors.address}</p>}

              <input type="file" name="profilePhoto" onChange={changeHandler} accept="image/*" />
            </>
          )}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
          {errors.password && <p className="error-message">{errors.password}</p>}

          {state === "Login" && (
            <p className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          )}
        </div>

        <button onClick={handleSubmit}>Continue</button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
        ) : (
          <p className="loginsignup-login">Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
