import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/CheckoutForm";
import ProductDetail from "./Pages/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartbyId } from "./store/cartApi";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "prodDetails/:id",
    element: <ProductDetail />,
  },
  {
    path: "/auth", // relative routing
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "signup",

        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedUsers);

  useEffect(() => {
    if (loggedUser) {
      dispatch(fetchCartbyId(loggedUser[0].id));
    }
  }, [dispatch, loggedUser]);
  return <RouterProvider router={router} />;
}

export default App;
