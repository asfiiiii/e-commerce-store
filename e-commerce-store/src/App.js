import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth", // relative routing
    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",

        element: <SignUp />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
