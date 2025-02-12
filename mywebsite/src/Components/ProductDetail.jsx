import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../Components/CartContext'; 

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product); 
    toast.success('Item added to cart successfully!');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Category:</strong> {product.category}</p>

          {/* Size Selection */}
          <div>
            <label htmlFor="size">Select Size: </label>
            <select id="size" className="form-select">
              {product.sizeOptions.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Quantity Selection */}
          <div className="mt-3">
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" id="quantity" className="form-control" min="1" max={product.stock} defaultValue="1" />
          </div>

          {/* Add to Cart Button */}
          <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
