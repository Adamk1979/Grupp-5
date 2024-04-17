import React from "react";

const ProductDetailModal = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          display: "flex",
          width: "600px",
          height: "400px",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: "300px", height: "100%", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Kategori: {product.category}</p>
          <p>Pris: {product.price} Kr</p>
          <button
            onClick={() => {
              onClose();
              addToCart(product);
            }}
            style={{
              alignSelf: "start",
              marginTop: "auto",
              padding: "10px 20px",
              backgroundColor: "#ff0000",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#cc0000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff0000")
            }
          >
            Köp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
