import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null); // Track editing mode
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });
    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);

    // Handle Image Upload
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle Input Changes
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Validate Form Data
    const validateForm = () => {
        let newErrors = {};

        if (!productDetails.name.trim() || productDetails.name.length < 3) {
            newErrors.name = "Product title must be at least 3 characters.";
        }

        if (!productDetails.old_price || isNaN(productDetails.old_price) || Number(productDetails.old_price) <= 0) {
            newErrors.old_price = "Enter a valid original price.";
        }

        if (!productDetails.new_price || isNaN(productDetails.new_price) || Number(productDetails.new_price) <= 0) {
            newErrors.new_price = "Enter a valid offer price.";
        }

        if (productDetails.new_price && productDetails.old_price && Number(productDetails.new_price) >= Number(productDetails.old_price)) {
            newErrors.new_price = "Offer price must be less than the original price.";
        }

        if (!image && !editingProductId) {
            newErrors.image = "Please upload an image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add or Edit Product
    const handleProductSubmit = async () => {
        if (!validateForm()) return;

        let product = { ...productDetails, image: editingProductId ? productDetails.image : "" };

        if (!editingProductId) {
            let formData = new FormData();
            formData.append('product', image);

            // Upload Image
            let response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            let responseData = await response.json();
            if (responseData.success) {
                product.image = responseData.image_url;
            } else {
                alert("Image upload failed");
                return;
            }
        }

        if (editingProductId) {
            // Update product in products list
            setProducts(products.map(p => p.id === editingProductId ? { ...product, id: editingProductId } : p));
            alert("Product Updated Successfully");
        } else {
            // Add new product to list
            product.id = Math.random().toString(36).substring(2, 9); // Mock product ID
            setProducts([...products, product]);
            alert("Product Added Successfully");
        }

        // Reset form and editing mode
        setProductDetails({ name: "", image: "", category: "women", new_price: "", old_price: "" });
        setImage(null);
        setEditingProductId(null);
    };

    const handleEdit = (product) => {
        setProductDetails(product);
        setEditingProductId(product.id);
    };

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const toggleActive = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, active: !product.active } : product
        ));
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* Price Input Fields */}
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                    {errors.old_price && <span className="error">{errors.old_price}</span>}
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
                    {errors.new_price && <span className="error">{errors.new_price}</span>}
                </div>
            </div>

            {/* Upload Button */}
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : productDetails.image || upload_area} className="addproduct-thumbnail-img" alt="Upload Preview" />
                </label>
                <input onChange={imageHandler} id="file-input" type="file" name='image' hidden />
                {errors.image && <span className="error">{errors.image}</span>}
            </div>

            <button onClick={handleProductSubmit} className='addproduct-btn'>
                {editingProductId ? 'UPDATE' : 'ADD'}
            </button>

            {/* Product Grid */}
            <div className="product-grid">
                <h2>Product List</h2>
                <div className="grid-header">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Old Price</span>
                    <span>New Price</span>
                    <span>Actions</span>
                </div>
                {products.map(product => (
                    <div key={product.id} className="grid-item">
                        <img src={product.image} alt={product.name} className="grid-item-image" />
                        <span>{product.name}</span>
                        <span>{product.category}</span>
                        <span>${product.old_price}</span>
                        <span>${product.new_price}</span>
                        <span>
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => toggleActive(product.id)}>{product.active ? 'Deactivate' : 'Activate'}</button>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddProduct;
