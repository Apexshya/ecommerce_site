import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
// import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Components/CartContext'; 
import './App.css';
import { ToastContainer } from 'react-toastify';
import Cart from './Components/Cart';

const App = () => {
  const isAuthenticated = localStorage.getItem("token"); 

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/product/:productId" 
            element={isAuthenticated ? <ProductDetail /> : <Login />} 
          />
          <Route 
            path="/cart" 
            element={isAuthenticated ? <Cart /> : <Login />} 
          />
          
        </Routes>
        <ToastContainer />
        {/* <Footer />  */}
      </Router>
    </CartProvider>
  );
};

export default App;
