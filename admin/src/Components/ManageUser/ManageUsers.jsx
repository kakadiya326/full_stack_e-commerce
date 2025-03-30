import React, { useState } from 'react';
import './ManageUsers.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const ManageUser = () => {
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserName: "",
        Email: "",
        Password: "",
        Role: "user",
        Mobile: "",
        Address: "",
        ImageURI: "",
    });

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [editingUserId, setEditingUserId] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file && file.size <= 2000000) {
                setFormData((prev) => ({
                    ...prev,
                    ImageURI: file, // Store file object
                }));
            } else {
                alert("Image should be less than 2MB");
                setFormData((prev) => ({ ...prev, ImageURI: "" }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        console.log("Status message updated:", statusMessage);
    }, [statusMessage]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.UserName || !formData.Email || !formData.Password || !formData.Address || !formData.Mobile) {
            setErrors({
                name: !formData.UserName ? "Name is required" : "",
                email: !formData.Email ? "Email is required" : "",
                password: !formData.Password ? "Password is required" : "",
                address: !formData.Address ? "Address is required" : "",
                mobile: !formData.Mobile ? "Mobile number is required" : "",
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("UserName", formData.UserName);
        formDataToSend.append("Email", formData.Email);
        formDataToSend.append("Password", formData.Password);
        formDataToSend.append("Role", formData.Role);
        formDataToSend.append("Mobile", formData.Mobile);
        formDataToSend.append("Address", formData.Address);
        formDataToSend.append("ImageURI", formData.ImageURI ? formData.ImageURI : "");

        console.log("Sending Data from Manage Users....", Object.fromEntries(formDataToSend.entries()));

        try {
            const response = await axios.post("http://localhost:5000/api/users/add-user", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log("Response Data:", response.data);

            setStatusMessage(response.data.message || "user added successfully")
            setStatusType("success");
        } catch (e) {
            console.log("Error Response Data:", e.response?.data); // Log full response

            const errorMessage = e.response?.data?.message || e.message || "An error occurred";

            setStatusMessage(errorMessage);
            setStatusType("error");
        }

        setFormData({
            UserName: "",
            Email: "",
            Password: "",
            Role: "user",
            Mobile: "",
            Address: "",
            ImageURI: "",
        });
        setErrors({});
    };

    // Edit user
    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setFormData(user);
    };

    // Toggle user active status
    const toggleActive = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, active: !user.active } : user));
    };

    // Delete user
    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="manage-user">
            <div>
                Total Users: {users.length}
                {users.length > 0 ? (
                    <>
                        ||  Active Users: {users.filter(user => user.active).length}
                        ||  Inactive Users: {users.filter(user => !user.active).length}
                    </>
                ) : (
                    <p>No users found</p>
                )}
            </div>
            {statusMessage && (
                <div className={`status-message ${statusType === "success" ? "success" : "error"}`}>
                    {typeof statusMessage === "string" ? statusMessage : JSON.stringify(statusMessage)}
                </div>
            )}



            <h1>Manage Users</h1>
            <form className="user-form" id="register_form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="user-form-item">
                    <p>User Name</p>
                    <input value={formData.UserName || ""} onChange={handleChange} type="text" name="UserName" placeholder="Enter user name" />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="user-form-item">
                    <p>Email</p>
                    <input value={formData.Email || ""} onChange={handleChange} type="email" name="Email" placeholder="Enter email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="user-form-item">
                    <p>Password</p>
                    <input value={formData.Password || ""} onChange={handleChange} type="password" name="Password" placeholder="Enter password" />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="user-form-item">
                    <p>Role</p>
                    <select name="Role" value={formData.Role} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="user-form-item">
                    <p>Mobile</p>
                    <input value={formData.Mobile || ""} onChange={handleChange} type="text" name="Mobile" placeholder="Enter user mobile" />
                    {errors.mobile && <span className='error'>{errors.mobile}</span>}
                </div>

                <div className="user-form-item">
                    <p>Address</p>
                    <input value={formData.Address || ""} onChange={handleChange} type="text" name="Address" placeholder="Enter user address" />
                    {errors.address && <span className='error'>{errors.address}</span>}
                </div>

                <div className="user-form-item">
                    <p>Profile Picture</p>
                    <input type="file" accept="image/*" name="profilePic" onChange={handleChange} />
                </div>

                {formData.ImageURI && (
                    <div className="image-preview">
                        <p>Image Preview:</p>
                        <img src={formData.ImageURI} alt="User Preview" />
                    </div>
                )}

                <button type="submit" className="user-form-btn">
                    {editingUserId ? "UPDATE USER" : "ADD USER"}
                </button>
            </form>

            <div className="user-form-search">
                <div className="search-container">
                    <input type="text" placeholder="Search by name or email" />
                    <button type="submit" className="user-form-btn-search">Search</button>
                    <button onClick={() => setUsers(users)} className="user-form-btn-search">Reset</button>
                </div>
            </div>



            {/* User List */}
            <div className="user-grid">
                <h2>User List</h2>
                <div className="grid-header">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Mobile</span>
                    <span>Address</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {users.map(user => (
                    <div key={user.id} className="grid-item">
                        <span>
                            <img src={user.ImageURI} alt={user.UserName} className="grid-image" />
                        </span>
                        <span>{user.UserName}</span>
                        <span>{user.Email}</span>
                        <span>{user.Role}</span>
                        <span>{user.Mobile}</span>
                        <span>{user.Address}</span>
                        <span>{user.active ? 'Active' : 'Inactive'}</span>
                        <span>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => toggleActive(user.id)}>{user.active ? 'Deactivate' : 'Activate'}</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUser;
