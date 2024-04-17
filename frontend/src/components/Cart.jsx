import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productID) => {
    setCart(cart.filter((item) => item._id !== productID));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
