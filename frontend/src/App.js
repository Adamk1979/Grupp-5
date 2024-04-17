// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Checkout from "./pages/Checkout.jsx";
import "./styles.css";

function App() {
  return (
    <CartProvider>
      <div style={{ backgroundColor: "#f8f4f1", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Add other routes here */}
        </Routes>
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

export default App;
