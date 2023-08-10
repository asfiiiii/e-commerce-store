import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Products from "../Components/Products/Products";
import ProductDetails from "../Components/ProductDetail/ProductDetail";
function Home() {
  return (
    <Navbar>
      <Products />
    </Navbar>
  );
}

export default Home;
