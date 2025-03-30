import React, { useState } from 'react';
import './ManageOffers.css';

const initialOfferState = {
    id: '',
    title: '',
    max_discount: '',
    min_discount: '',
    total_discount: '',
    active: true,
};

const ManageOffers = () => {
    const [offerDetails, setOfferDetails] = useState(initialOfferState);
    const [errors, setErrors] = useState({});
    const [offers, setOffers] = useState([]);
    const [editingOfferId, setEditingOfferId] = useState(null);

    const changeHandler = (e) => {
        setOfferDetails({ ...offerDetails, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!offerDetails.title.trim() || offerDetails.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters.';
        }
        if (!offerDetails.max_discount || isNaN(offerDetails.max_discount) || Number(offerDetails.max_discount) <= 0) {
            newErrors.max_discount = 'Enter a valid max discount.';
        }
        if (!offerDetails.min_discount || isNaN(offerDetails.min_discount) || Number(offerDetails.min_discount) <= 0) {
            newErrors.min_discount = 'Enter a valid min discount.';
        }
        if (Number(offerDetails.min_discount) > Number(offerDetails.max_discount)) {
            newErrors.min_discount = 'Min discount should not be greater than max discount.';
        }
        if (!offerDetails.total_discount || isNaN(offerDetails.total_discount) || Number(offerDetails.total_discount) <= 0) {
            newErrors.total_discount = 'Enter a valid total discount.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOfferSubmit = () => {
        if (!validateForm()) return;
        if (editingOfferId) {
            setOffers(offers.map((offer) =>
                offer.id === editingOfferId ? { ...offerDetails, id: editingOfferId } : offer
            ));
            alert('Offer Updated Successfully');
        } else {
            setOffers([
                ...offers,
                { ...offerDetails, id: Math.random().toString(36).substring(2, 9), active: true },
            ]);
            alert('Offer Added Successfully');
        }
        setOfferDetails(initialOfferState);
        setEditingOfferId(null);
    };

    const handleEdit = (offer) => {
        setOfferDetails(offer);
        setEditingOfferId(offer.id);
    };

    const deleteOffer = (id) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            setOffers(offers.filter((offer) => offer.id !== id));
        }
    };

    const toggleActive = (id) => {
        setOffers(offers.map((offer) =>
            offer.id === id ? { ...offer, active: !offer.active } : offer
        ));
    };

    return (
        <div className="manage-offers">
            <h1>Manage Offers</h1>

            <div className="add-offer-form">
                <input
                    value={offerDetails.title}
                    onChange={changeHandler}
                    onBlur={validateForm}
                    type="text"
                    name="title"
                    placeholder="Enter title"
                />
                {errors.title && <span className="error">{errors.title}</span>}

                <input
                    value={offerDetails.max_discount}
                    onChange={changeHandler}
                    onBlur={validateForm}
                    type="text"
                    name="max_discount"
                    placeholder="Enter max discount"
                />
                {errors.max_discount && <span className="error">{errors.max_discount}</span>}

                <input
                    value={offerDetails.min_discount}
                    onChange={changeHandler}
                    onBlur={validateForm}
                    type="text"
                    name="min_discount"
                    placeholder="Enter min discount"
                />
                {errors.min_discount && <span className="error">{errors.min_discount}</span>}

                <input
                    value={offerDetails.total_discount}
                    onChange={changeHandler}
                    onBlur={validateForm}
                    type="text"
                    name="total_discount"
                    placeholder="Enter total discount"
                />
                {errors.total_discount && <span className="error">{errors.total_discount}</span>}

                <button onClick={handleOfferSubmit}>
                    {editingOfferId ? 'Update Offer' : 'Add Offer'}
                </button>
            </div>

            <div className="offers-table-container">
                <h2>Offer List</h2>
                {offers.length === 0 && <p>No offers available. Add new offers to display them here.</p>}
                {offers.length > 0 && (
                    <div className="offers-table">
                        <div className="offers-table-header">
                            <span>ID</span>
                            <span>Title</span>
                            <span>Max</span>
                            <span>Min</span>
                            <span>Total</span>
                            <span>Status</span>
                            <span>Actions</span>
                        </div>

                        {offers.map((offer) => (
                            <div key={offer.id} className="offers-table-row">
                                <span>{offer.id}</span>
                                <span>{offer.title}</span>
                                <span>{offer.max_discount}</span>
                                <span>{offer.min_discount}</span>
                                <span>{offer.total_discount}</span>
                                <span>{offer.active ? 'Active' : 'Inactive'}</span>
                                <div className="offer-actions">
                                    <button onClick={() => handleEdit(offer)}>Edit</button>
                                    <button onClick={() => toggleActive(offer.id)}>
                                        {offer.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button onClick={() => deleteOffer(offer.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageOffers;
