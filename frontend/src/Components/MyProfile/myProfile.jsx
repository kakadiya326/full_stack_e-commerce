import React, { useState } from 'react';
import './myProfile.css';

const MyProfile = () => {
  const [user, setUser] = useState({ 
    name: "Devanshu", 
    email: "devanshu0017@gmail.com",
    mobile: "9586551708",
    address: "Rajkot",
    profilePhoto: null,
    profilePhotoPreview: null
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      const file = files[0];
      setUser({
        ...user,
        profilePhoto: file,
        profilePhotoPreview: file ? URL.createObjectURL(file) : null
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!user.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(user.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!user.address.trim()) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Updated Profile:", user);
      alert("Profile Updated Successfully!");
    }
  };

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-photo-section">
          {user.profilePhotoPreview ? (
            <img src={user.profilePhotoPreview} alt="Profile" className="profile-photo" />
          ) : (
            <p><strong>Profile Photo:</strong> Not uploaded</p>
          )}
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} />
        </div>

        <div className="profile-details">
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <label>Mobile:</label>
          <input type="text" name="mobile" value={user.mobile} onChange={handleChange} />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}

          <label>Address:</label>
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;