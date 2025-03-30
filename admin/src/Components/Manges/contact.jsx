import React, { useState } from 'react';
import './contact.css'
// Importing assets
import instagram_icon from '../../assets/instagram_icon.png';
import pintester_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';

const ContactAdmin = ({ isAdmin }) => {
    const [contactText, setContactText] = useState({
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        socialMedia: 'Social Media',
        copyright: 'Copyright @ 2023 - All rights reserved.',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle editing content
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setContactText((prevText) => ({
            ...prevText,
            [name]: value,
        }));
    };

    // Handle toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Handle deleting contact section
    const handleDeleteSection = (section) => {
        setContactText((prevText) => {
            const updatedText = { ...prevText };
            delete updatedText[section];
            return updatedText;
        });
    };

    return (
        <div className="contact-us">
            <div className="contact-us-logo">
                <p>SHOPPER</p>
            </div>
            
            {/* Render Contact Information Links */}
            <ul className="contact-us-links">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="email"
                            value={contactText.email}
                            onChange={handleEditChange}
                            placeholder="Edit Email"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={contactText.phone}
                            onChange={handleEditChange}
                            placeholder="Edit Phone"
                        />
                        <input
                            type="text"
                            name="address"
                            value={contactText.address}
                            onChange={handleEditChange}
                            placeholder="Edit Address"
                        />
                        <input
                            type="text"
                            name="socialMedia"
                            value={contactText.socialMedia}
                            onChange={handleEditChange}
                            placeholder="Edit Social Media"
                        />
                    </>
                ) : (
                    <>
                        <li>{contactText.email}</li>
                        <li>{contactText.phone}</li>
                        <li>{contactText.address}</li>
                        <li>{contactText.socialMedia}</li>
                    </>
                )}
            </ul>
            
            {/* Render Social Icons */}
            <div className="contact-us-social-icon">
                <div className="contact-us-icons-container">
                    <img src={instagram_icon} alt="Instagram" />
                </div>
                <div className="contact-us-icons-container">
                    <img src={pintester_icon} alt="Pinterest" />
                </div>
                <div className="contact-us-icons-container">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </div>
            </div>
            
            {/* Render Copyright */}
            {isEditing ? (
                <input
                    type="text"
                    name="copyright"
                    value={contactText.copyright}
                    onChange={handleEditChange}
                    placeholder="Edit Copyright"
                />
            ) : (
                <div className="contact-us-copyright">
                    <hr />
                    <p>{contactText.copyright}</p>
                </div>
            )}

            {/* Admin Controls (Edit/Delete) */}
            {isAdmin && (
                <div className="contact-us-admin-controls">
                    <button onClick={toggleEditMode}>
                        {isEditing ? 'Save Changes' : 'Edit Contact Us'}
                    </button>
                    {isEditing && (
                        <>
                            <button onClick={() => handleDeleteSection('email')}>Delete 'Email'</button>
                            <button onClick={() => handleDeleteSection('phone')}>Delete 'Phone'</button>
                            <button onClick={() => handleDeleteSection('address')}>Delete 'Address'</button>
                            <button onClick={() => handleDeleteSection('socialMedia')}>Delete 'Social Media'</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContactAdmin;
