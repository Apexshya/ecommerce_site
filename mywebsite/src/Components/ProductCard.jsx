import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    objectFit: 'cover',
    height: '250px', 
    transition: 'transform 0.3s ease, filter 0.3s ease', 
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
    filter: isHovered ? 'brightness(85%)' : 'brightness(100%)', 
  };

  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)', 
    boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none', 
    borderRadius: '10px', 
    overflow: 'hidden', 
  };

  const buttonStyle = {
    transition: 'background-color 0.3s ease, color 0.3s ease', 
    borderRadius: '5px', 
  };

  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <img
        src={product.image}
        className="card-img-top img-fluid"
        alt={product.name}
        style={imageStyle}
      />
      <div className="card-body text-center p-4">
        <h5 className="card-title fw-bold mb-3">{product.name}</h5>
        <p className="card-text text-muted mb-4">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="btn btn-outline-primary w-100" style={buttonStyle}>
  View Details
</Link>

      </div>
    </div>
  );
};

export default ProductCard;
