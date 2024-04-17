import React, { useState } from "react";

const SearchAndFilter = ({ onCategorySelect, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    "Skafferi",
    "Storpack",
    "Drycker",
    "Snacks & Godis",
    "Träning & vikt",
    "Hygien & apotek",
    "Bröd, kex & kakor",
    "Barn & baby",
    "Hem & städ",
    "Husdjur",
    "Eko",
    "Veganskt",
    "Glutenfri mat",
  ];

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />
      <div>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
