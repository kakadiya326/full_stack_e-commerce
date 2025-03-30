import React, { useState } from 'react';
import './aboutus.css';
// Importing assets
import instagram_icon from '../../assets/instagram_icon.png';
import pintester_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';

const AboutAdmin = ({ isAdmin }) => {
    const [aboutText, setAboutText] = useState({
        companyName: 'Company Name',
        mission: 'Our mission is to provide the best service.',
        vision: 'Our vision is to become a global leader.',
        values: 'Integrity, Innovation, Excellence',
        copyright: 'Copyright @ 2025 - All rights reserved.',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle editing content
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setAboutText((prevText) => ({
            ...prevText,
            [name]: value,
        }));
    };

    // Handle toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Handle deleting about section
    const handleDeleteSection = (section) => {
        setAboutText((prevText) => {
            const updatedText = { ...prevText };
            delete updatedText[section];
            return updatedText;
        });
    };

    return (
        <div className="about-us">
            <div className="about-us-logo">
                <p>SHOPPER</p>
            </div>
            
            {/* Render About Information Links */}
            <ul className="about-us-links">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="companyName"
                            value={aboutText.companyName}
                            onChange={handleEditChange}
                            placeholder="Edit Company Name"
                        />
                        <textarea
                            name="mission"
                            value={aboutText.mission}
                            onChange={handleEditChange}
                            placeholder="Edit Mission"
                        />
                        <textarea
                            name="vision"
                            value={aboutText.vision}
                            onChange={handleEditChange}
                            placeholder="Edit Vision"
                        />
                        <textarea
                            name="values"
                            value={aboutText.values}
                            onChange={handleEditChange}
                            placeholder="Edit Values"
                        />
                    </>
                ) : (
                    <>
                        <li>{aboutText.companyName}</li>
                        <li>{aboutText.mission}</li>
                        <li>{aboutText.vision}</li>
                        <li>{aboutText.values}</li>
                    </>
                )}
            </ul>
            
            {/* Render Social Icons */}
            <div className="about-us-social-icon">
                <div className="about-us-icons-container">
                    <img src={instagram_icon} alt="Instagram" />
                </div>
                <div className="about-us-icons-container">
                    <img src={pintester_icon} alt="Pinterest" />
                </div>
                <div className="about-us-icons-container">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </div>
            </div>
            
            {/* Render Copyright */}
            {isEditing ? (
                <input
                    type="text"
                    name="copyright"
                    value={aboutText.copyright}
                    onChange={handleEditChange}
                    placeholder="Edit Copyright"
                />
            ) : (
                <div className="about-us-copyright">
                    <hr />
                    <p>{aboutText.copyright}</p>
                </div>
            )}

            {/* Admin Controls (Edit/Delete) */}
            {isAdmin && (
                <div className="about-us-admin-controls">
                    <button onClick={toggleEditMode}>
                        {isEditing ? 'Save Changes' : 'Edit About Us'}
                    </button>
                    {isEditing && (
                        <>
                            <button onClick={() => handleDeleteSection('companyName')}>Delete 'Company Name'</button>
                            <button onClick={() => handleDeleteSection('mission')}>Delete 'Mission'</button>
                            <button onClick={() => handleDeleteSection('vision')}>Delete 'Vision'</button>
                            <button onClick={() => handleDeleteSection('values')}>Delete 'Values'</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AboutAdmin;
