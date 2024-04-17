import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import "../styles.css"; // This imports your centralized stylesheet

const CartSidebar = () => {
  const { cart, isCartOpen, toggleCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = (totalPrice * 0.12).toFixed(2);
  const totalIncludingTax = (totalPrice + parseFloat(tax)).toFixed(2);

  // Return null or the sidebar structure based on `isCartOpen`
  return (
    <>
      {isCartOpen && <div className="backdrop" onClick={toggleCart}></div>}

      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <button onClick={toggleCart} className="close-button">
          Stäng
        </button>
        <h4 className="cartSidebar-title">Varukorg</h4>
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
        <div className="total-section">Moms (12%): {tax} Kr</div>
        <div className="total-section bold">
          Totalsumma: {totalIncludingTax} Kr
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="checkout-button"
        >
          Till kassan
        </button>
      </div>
    </>
  );
};

export default CartSidebar;
