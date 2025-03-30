import React, { useEffect, useState } from 'react';
import './CartProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import upload_area from '../../assets/upload_area.svg';

const CartProduct = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        price: "",
    });
    const [image, setImage] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch cart products
    const fetchCartProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/cartproducts');
            if (!response.ok) throw new Error('Failed to fetch cart products');
            const data = await response.json();
            setCartProducts(data);
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }
    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

    // Handle Input Changes
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Handle Image Upload
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Validate Form Data
    const validateForm = () => {
        let newErrors = {};

        if (!productDetails.name.trim() || productDetails.name.length < 3) {
            newErrors.name = "Product title must be at least 3 characters.";
        }

        if (!productDetails.price || isNaN(productDetails.price) || Number(productDetails.price) <= 0) {
            newErrors.price = "Enter a valid price.";
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
            setCartProducts(cartProducts.map(p => p.id === editingProductId ? { ...product, id: editingProductId } : p));
            alert("Product Updated Successfully");
        } else {
            product.id = Math.random().toString(36).substring(2, 9); // Mock product ID
            setCartProducts([...cartProducts, product]);
            alert("Product Added Successfully");
        }

        setProductDetails({ name: "", image: "", category: "women", price: "" });
        setImage(null);
        setEditingProductId(null);
    };

    // Handle Edit
    const handleEdit = (product) => {
        setProductDetails(product);
        setEditingProductId(product.id);
    };

    // Delete Product
    const deleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setCartProducts(cartProducts.filter(product => product.id !== id));
        }
    };

    // Toggle Active/Inactive
    const toggleActive = (id) => {
        setCartProducts(cartProducts.map(product => 
            product.id === id ? { ...product, active: !product.active } : product
        ));
    };

    return (
        <div className='cart-product'>
            <h1>Add or Edit Cart Details</h1>
            <div className='add-product-form'>
                <div className="addproduct-itemfield">
                    <p>Product Title</p>
                    <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type here" />
                    {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="addproduct-itemfield">
                    <p>Category</p>
                    <select name="category" value={productDetails.category} onChange={changeHandler}>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

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
            </div>

            <div className="product-grid">
                <h2>Product List</h2>
                <div className="grid-header">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Actions</span>
                </div>
                {cartProducts.map(product => (
                    <div key={product.id} className="grid-item">
                        <img src={product.image} alt={product.name} className="grid-item-image" />
                        <span>{product.name}</span>
                        <span>{product.category}</span>
                        <span>${product.price}</span>
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
};

export default CartProduct;