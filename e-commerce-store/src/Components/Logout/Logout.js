import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutCurrentUser } from "../../store/userApi";
import { Navigate } from "react-router-dom";
function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedUsers);

  useEffect(() => {
    dispatch(logoutCurrentUser());
  }, [dispatch]);

  return <>{!user && <Navigate replace={true} to="/" />}</>;
}

export default Logout;
