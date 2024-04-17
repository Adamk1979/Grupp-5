import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/apiServices.js";
import ProductDetailModal from "./ProductDetailModal";
import Pagination from "./Pagination.jsx"; // Make sure you have this component

const ProductList = ({ category, search }) => {
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const initFetch = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    initFetch();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeDetailModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = allProducts.filter((product) => {
    const productMatchesCategory = category
      ? product.category === category
      : true;
    const productName = product.name || "";
    const productMatchesSearch = search
      ? productName.toLowerCase().includes(search.toLowerCase())
      : true;
    return productMatchesCategory && productMatchesSearch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {currentProducts.map((product) => (
          <div
            key={product._id}
            style={{
              fontFamily: "Lato, sans-serif",
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onClick={() => handleProductClick(product)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "160px",
                height: "160px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Kategori: {product.category}</p>
            <p>Pris: {product.price} Kr</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              style={{
                alignSelf: "center",
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
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeDetailModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductList;
