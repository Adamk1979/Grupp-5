import React from "react";
import headerImage from "../img/HeaderLogo.png";

const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "##f8f4f1",
        padding: "10px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={headerImage}
        alt="Hakim Livs"
        style={{
          display: "block", // Ensures it doesn't inline by default
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%", // Adjust the size as needed
        }}
      />
    </header>
  );
};

export default Header;
