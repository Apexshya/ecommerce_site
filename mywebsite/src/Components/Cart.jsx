import React, { useContext, useState } from "react";
import { CartContext } from "../Components/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId) 
        : [...prev, itemId] 
    );
  };

  const subtotal = cart
    .filter((item) => selectedItems.includes(item._id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item.id} className="d-flex align-items-center border p-3 mb-3">
                <input
                  type="checkbox"
                  className="me-3"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
                <img src={item.image} alt={item.name} width="80" height="80" className="me-3" />
                <div className="flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted">Rs. {item.price}</p>
                  <button onClick={() => removeFromCart(item._id)} className="btn btn-danger btn-sm">
                    Remove
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="border p-3">
              <h5>Order Summary</h5>
              <p>Subtotal: Rs. {subtotal.toFixed(2)}</p>
              <p>Shipping Fee: Rs. 0</p>
              <input type="text" placeholder="Enter Voucher Code" className="form-control my-2" />
              <button className="btn btn-primary w-100">Apply</button>
              <hr />
              <h5>Total: Rs. {subtotal.toFixed(2)}</h5>
              <button className="btn btn-warning w-100">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;



