import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext); 
  const userName = localStorage.getItem("userName");

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/login"; 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          <i className="bi bi-shop"></i> Ghar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto w-50">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search in Ghar"
              aria-label="Search"
            />
            <button className="btn btn-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <ul className="navbar-nav ms-auto">
            {userName ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Hello, {userName}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-white btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white position-relative" to="/cart">
                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                {cartItemCount > 0 && (
                  <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
