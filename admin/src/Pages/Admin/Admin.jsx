import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
// import AddProduct from '../../Components/AddProduct/Addproduct'
import AddProduct from '../../Components/AddProduct/AddProduct'
import CartProduct from '../../Components/CartProduct/CartProduct'
import ManageUsers from '../../Components/ManageUser/ManageUsers'
import ManageOffers from '../../Components/ManageOffers/ManageOffers'
import Dashboard from '../../Components/DashBoard/DashBoard'
import OrderProducts from '../../Components/OrderProduct/OrderProduct'
import ContactAdmin from '../../Components/Manges/contact'
import FooterAdmin from '../../Components/Manges/aboutus'

const Admin = () => {
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin-content">
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/addproduct' element={<AddProduct />} />
                    <Route path='/cartproduct' element={<CartProduct />} />
                    <Route path='/manageusers' element={<ManageUsers />} />
                    <Route path='/manageoffers' element={<ManageOffers />} />
                    <Route path='/manageorders' element={<OrderProducts />} />
                    <Route path='/about' element={<FooterAdmin isAdmin={true} />} />
                    <Route path='/contact' element={<ContactAdmin isAdmin={true} />} />
                </Routes>
            </div>
        </div>
    )
}


export default Admin
