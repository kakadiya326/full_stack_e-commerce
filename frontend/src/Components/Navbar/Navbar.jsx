import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import profile_icon from '../../Components/Assets/myprofile.png'; // Import Profile Icon
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === 'shop' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === 'mens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === 'womens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === 'kids' ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        

        {/* Cart Section */}
        <div className="nav-cart-container">
  <Link to="/cart" className="nav-cart-link">
    <img src={cart_icon} alt="Cart" className="nav-cart-icon" />
    {getTotalCartItems() > 0 && (
      <span className="nav-cart-count">{getTotalCartItems()}</span>
    )}
  </Link>
</div>

        {localStorage.getItem('auth-token') ? (
          <button className="auth-button" onClick={() => { 
              localStorage.removeItem('auth-token'); 
              window.location.replace('/');
          }}>
            Logout
          </button>
        ) : (
          <Link to='/login'>
            <button className="auth-button">Login</button>
          </Link>
        )}


        {/* Profile Icon */}
        <Link to='/myprofile'>
          <img src={profile_icon} alt="Profile" className="nav-profile-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
