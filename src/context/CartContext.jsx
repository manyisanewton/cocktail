import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage if it exists
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (cocktail) => {
    console.log('Adding to cart:', cocktail);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.idDrink === cocktail.idDrink);
      if (existingItem) {
        return prevCart.map((item) =>
          item.idDrink === cocktail.idDrink
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem = {
        idDrink: cocktail.idDrink,
        strDrink: cocktail.strDrink,
        strDrinkThumb: cocktail.strDrinkThumb,
        price: cocktail.price || 10,
        quantity: 1,
      };
      return [...prevCart, newItem];
    });
  };

  const updateQuantity = (idDrink, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(idDrink);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idDrink === idDrink ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (idDrink) => {
    setCart((prevCart) => prevCart.filter((item) => item.idDrink !== idDrink));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}