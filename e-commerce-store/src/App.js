import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/CheckoutForm";
import ProductDetail from "./Pages/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "prodDetails",
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
  return <RouterProvider router={router} />;
}

export default App;
