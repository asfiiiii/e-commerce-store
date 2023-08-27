import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductsList";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/CheckoutForm";
import OrderSuccess from "./Pages/orderSuccess";
import PageNotFound from "./Pages/pageNotFound";
import ProductDetail from "./Pages/ProductDetails";
import UserOrder from "./Pages/UserOrder";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartbyId } from "./store/cartApi";
import UserProfile from "./Pages/UserProfile";
import { getUserDetails } from "./store/userApi";
import Logout from "./Components/Logout/Logout";
import Protected from "./Pages/Protected";
import AdminProducts from "./Components/Products/AdminProducts";
import AdminOrderPanel from "./Components/Order/AdminOrderPanel";
import AddProduct from "./Components/Products/AddProduct";
import EditProduct from "./Components/Products/EditProduct";
import StripePayment from "./Pages/Stripe_payment";
import { checkUser } from "./store/authApi";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/prodDetails",
    element: <ProductList />,
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
      {
        path: "logout",

        element: <Logout />,
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "products",
        element: (
          <Protected>
            <AdminProducts />
          </Protected>
        ),
      },
      {
        path: "addProduct",
        element: (
          <Protected>
            <AddProduct />
          </Protected>
        ),
      },
      {
        path: "editProduct/:id",
        element: (
          <Protected>
            <EditProduct />
          </Protected>
        ),
      },
      {
        path: "orderPanel",
        element: (
          <Protected>
            <AdminOrderPanel />
          </Protected>
        ),
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
  {
    path: "/orderSuccess/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/card_payment/:id",
    element: <StripePayment />,
  },
  {
    path: "/userOrder",
    element: <UserOrder />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedUsers);
  const userChecked = useSelector((state) => state.users.checkedUsers);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      dispatch(fetchCartbyId());
      dispatch(getUserDetails());
    }
  }, [dispatch, loggedUser]);

  return <>{userChecked && <RouterProvider router={router} />};</>;
}

export default App;
