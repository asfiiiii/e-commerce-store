const express = require("express");
const { ConnectDB } = require("./connect_db");
const passport = require("passport");

const ProductsRoutes = require("./Routes/ProductsRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const BrandRoutes = require("./Routes/BrandsRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const cors = require("cors");
const app = express();

// passport
require("./Config/passport");
passport.initialize();

// Database Connection
ConnectDB();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000" }));

// ... other routes and server setup ...
// const { hashSync, compare } = require("bcrypt");
// const jwt = require("jsonwebtoken");

// app.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     // This route is protected and can only be accessed with a valid JWT
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//   }
// );

app.use("/products", ProductsRoutes);
app.use("/category", CategoryRoutes);
app.use("/brands", BrandRoutes);
app.use("/auth", AuthRoutes);
app.use("/cart", CartRoutes);
app.use("/user", UserRoutes);
app.use("/orders", OrderRoutes);
app.use("/admin", AdminRoutes);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
