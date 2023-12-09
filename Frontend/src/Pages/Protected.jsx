import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Protected(props) {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      {user && user.role !== "admin" && <Navigate to="/" />}
      <Navbar>{props.children}</Navbar>;
    </>
  );
}

export default Protected;
