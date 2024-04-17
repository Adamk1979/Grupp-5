import React, { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import SearchAndFilter from "../components/SearchAndFilter.jsx";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1200px",
        margin: "20px auto",
        gap: "20px",
      }}
    >
      <div style={{ minWidth: "200px" }}>
        <SearchAndFilter
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
        />
      </div>
      <div style={{ flex: 1 }}>
        <ProductList
          className="productList"
          category={selectedCategory}
          search={searchTerm}
        />
      </div>
    </div>
  );
};

export default Home;
