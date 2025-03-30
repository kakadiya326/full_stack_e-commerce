import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/add_product_icon.png';
import cart_icon from '../../assets/cart.svg';
import manage_users_icon from '../../assets/manage_users_icon.png';
import manage_offers_icon from '../../assets/manage_offers_icon.png';
import home_icon from '../../assets/home_icon.png';
import order_icon from '../../assets/icons8-order-50.png';
import navlogo from '../../assets/nav-logo.svg'
import more_icon from '../../assets/icons8-more-40.png'
import about_icon from '../../assets/icons8-about-us-30.png'
import contact_icon from '../../assets/icons8-contact-us-50.png'

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
    };

    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions); // Toggle visibility of floating buttons
    };

    return (
        <>
            {/* Toggle button with hamburger icon */}
            <button onClick={toggleSidebar} className="sidebar-toggle-btn">
                ☰
            </button>

            <div className={`sidebar ${isSidebarVisible ? 'active' : ''}`}>
                <div className="navbar">
                    <img src={navlogo} alt="" className='nav-logo' />
                </div>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={home_icon} alt="Home" />
                        <p>Home</p>
                    </div>
                </Link>

                <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={add_product_icon} alt="Add Product" />
                        <p>Add Product</p>
                    </div>
                </Link>

                <Link to={'/cartproduct'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={cart_icon} alt="Cart Product" />
                        <p>Cart Product</p>
                    </div>
                </Link>

                <Link to={'/manageusers'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={manage_users_icon} alt="Manage Users" />
                        <p>Manage Users</p>
                    </div>
                </Link>

                <Link to={'/manageoffers'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={manage_offers_icon} alt="Manage Offers" />
                        <p>Manage Offers</p>
                    </div>
                </Link>

                <Link to={'/manageorders'} style={{ textDecoration: 'none' }}>
                    <div className="sidebar-item">
                        <img src={order_icon} alt="Manage Orders" />
                        <p>Manage Orders</p>
                    </div>
                </Link>

                {/* More Options Button */}
                <div className="sidebar-item" onClick={toggleMoreOptions}>
                    <img src={more_icon} alt="Manage Orders" />
                    <p>More Options</p>
                </div>

                {/* Floating Buttons for Contact Us and About Us */}
                {showMoreOptions && (
                    <div className="floating-options">
                        <Link to="/contact" className="sidebar-item floating-item">
                            <img src={contact_icon} alt="Manage Orders" />
                            <p>Contact Us</p>
                        </Link>
                        <Link to="/about" className="sidebar-item floating-item">
                            <img src={about_icon} alt="Manage Orders" />
                            <p>About Us</p>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
