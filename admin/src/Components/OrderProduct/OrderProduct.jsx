import React, { useState } from 'react';
import './OrderProduct.css';

const initialProductState = {
    product_name: '',
    applied_offer: '',
    total_amount: '',
    discounted_amount: '',
    date: '',
    payment_status: '',
};

const OrderProducts = () => {
    const [productDetails, setProductDetails] = useState(initialProductState);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        
        if (!productDetails.product_name.trim() || productDetails.product_name.length < 3) {
            newErrors.product_name = "Product Name must be at least 3 characters.";
        }

        if (!productDetails.total_amount || isNaN(productDetails.total_amount) || Number(productDetails.total_amount) <= 0) {
            newErrors.total_amount = "Enter a valid Total Amount (greater than 0).";
        }

        if (productDetails.discounted_amount && 
            (isNaN(productDetails.discounted_amount) || Number(productDetails.discounted_amount) < 0 || 
            Number(productDetails.discounted_amount) >= Number(productDetails.total_amount))) {
            newErrors.discounted_amount = "Discounted Amount must be less than the Total Amount.";
        }

        if (!productDetails.date) {
            newErrors.date = "Please select a valid date.";
        }

        if (!productDetails.payment_status.trim()) {
            newErrors.payment_status = "Payment Status cannot be empty.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Valid if no errors
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleProductSubmit = () => {
        if (!validateForm()) return; // Stop if validation fails

        setProducts([...products, { ...productDetails, id: Math.random().toString(36).substring(2, 9) }]);
        setProductDetails(initialProductState); // Reset form
        setErrors({});
        alert('Product Added Successfully');
    };

    return (
        <div className="manage-products">
            <h1>Order Products</h1>

            <div className="add-product-form">
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={productDetails.product_name}
                    onChange={changeHandler}
                />
                {errors.product_name && <span className="error">{errors.product_name}</span>}

                <input
                    type="text"
                    name="applied_offer"
                    placeholder="Applied Offer"
                    value={productDetails.applied_offer}
                    onChange={changeHandler}
                />

                <input
                    type="text"
                    name="total_amount"
                    placeholder="Total Amount"
                    value={productDetails.total_amount}
                    onChange={changeHandler}
                />
                {errors.total_amount && <span className="error">{errors.total_amount}</span>}

                <input
                    type="text"
                    name="discounted_amount"
                    placeholder="Discounted Amount"
                    value={productDetails.discounted_amount}
                    onChange={changeHandler}
                />
                {errors.discounted_amount && <span className="error">{errors.discounted_amount}</span>}

                <input
                    type="date"
                    name="date"
                    value={productDetails.date}
                    onChange={changeHandler}
                />
                {errors.date && <span className="error">{errors.date}</span>}

                <input
                    type="text"
                    name="payment_status"
                    placeholder="Payment Status"
                    value={productDetails.payment_status}
                    onChange={changeHandler}
                />
                {errors.payment_status && <span className="error">{errors.payment_status}</span>}

                <button onClick={handleProductSubmit}>Add Product</button>
            </div>

            <div className="products-table-container">
                <h2>Product Orders</h2>
                {products.length === 0 && <p>No products available. Add new products to display them here.</p>}
                {products.length > 0 && (
                    <div className="products-table">
                        <div className="products-table-header">
                            <span>ID</span>
                            <span>Product Name</span>
                            <span>Applied Offer</span>
                            <span>Total Amount</span>
                            <span>Discounted Amount</span>
                            <span>Date</span>
                            <span>Payment Status</span>
                        </div>
                        {products.map((product) => (
                            <div key={product.id} className="products-table-row">
                                <span>{product.id}</span>
                                <span>{product.product_name}</span>
                                <span>{product.applied_offer}</span>
                                <span>{product.total_amount}</span>
                                <span>{product.discounted_amount}</span>
                                <span>{product.date}</span>
                                <span>{product.payment_status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderProducts;
