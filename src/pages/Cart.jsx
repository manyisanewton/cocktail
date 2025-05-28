import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css'; // Import the new CSS file

// Initialize Stripe with a mock publishable key
const stripePromise = loadStripe('pk_test_51R4OcUP20HvRcftIypZYsPfHTFYQosf5F3fm6CyUbkJcKENj1Tc6hE0eKyuJVzSvtwEhR6kO7snSNDcPZuUSDzy600FbXP850H');

function CheckoutForm({ totalPrice, clearCart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const paymentResult = await new Promise((resolve) =>
        setTimeout(() => resolve({ error: null }), 2000)
      );

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Thank you for your purchase. Your order has been placed.',
          showConfirmButton: true,
          confirmButtonText: 'Go to Home',
          confirmButtonColor: '#f1c40f',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/';
          }
        });
        clearCart();
        setProcessing(false);
      }
    } catch (err) {
      setError('An error occurred while processing your payment.');
      setProcessing(false);
    }
  };

  return (
    <motion.div
      className="checkout-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Checkout</h3>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Shipping Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement className="card-element" />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={!stripe || processing} className="submit-button">
        {processing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
      </button>
    </motion.div>
  );
}

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [cocktailDetails, setCocktailDetails] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    console.log('Current cart state:', cart);
    const fetchCocktailDetails = async () => {
      const details = {};
      for (const item of cart) {
        if (!cocktailDetails[item.idDrink]) {
          try {
            const response = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`
            );
            const data = await response.json();
            if (data.drinks && data.drinks[0]) {
              details[item.idDrink] = data.drinks[0];
            }
          } catch (error) {
            console.error('Error fetching cocktail details:', error);
          }
        }
      }
      setCocktailDetails((prev) => ({ ...prev, ...details }));
    };

    if (cart.length > 0) {
      fetchCocktailDetails();
    }
  }, [cart]);

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <motion.div
        className="cart-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Your Cart is Empty</h2>
        <p>Start exploring to add cocktails to your cart!</p>
        <a href="/" className="cart-link">Back to Home</a>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => {
          const cocktail = cocktailDetails[item.idDrink] || {};
          return (
            <motion.div
              key={item.idDrink}
              className="cart-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={cocktail.strDrinkThumb || item.strDrinkThumb || 'https://via.placeholder.com/150'}
                alt={item.strDrink}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.strDrink}</h3>
                <p>Price: ${(item.price || 0).toFixed(2)}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.idDrink, item.quantity - 1)}
                    className="quantity-button"
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.idDrink, item.quantity + 1)}
                    className="quantity-button"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="cart-remove-button"
                  onClick={() => removeFromCart(item.idDrink)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="cart-summary">
        <h3>Total: ${(totalPrice || 0).toFixed(2)}</h3>
        <div className="cart-actions">
          <button className="cart-clear-button" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="cart-checkout-button"
            onClick={() => setShowCheckout(true)}
            disabled={showCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      {showCheckout && (
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={totalPrice} clearCart={clearCart} />
        </Elements>
      )}
    </motion.section>
  );
}

export default Cart;