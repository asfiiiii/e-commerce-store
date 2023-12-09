const express = require("express");
require("dotenv").config();

const { ConnectDB } = require("./connect_db");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const BrandRoutes = require("./Routes/BrandsRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));

app.use(cookieParser());
// passport
require("./Config/passport");
passport.initialize();

// Database Connection
ConnectDB();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
// stripe setup

// const stripe = require("stripe")(
//   "sk_test_51NjgcGSHr6F8DFBRHiUeqs7w4vQ4Xhr9ug0RFBO57FKUNI67h4nKMRyt9X7s5I2XAze3F70TqmLK0Nwl7PMgZmj700J056RY8L"
// );

// app.use(express.static("public"));

// app.post("/create-payment-intent", async (req, res) => {
//   const { totalAmount } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalAmount,
//     currency: "pkr",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

//routes
app.use("/products", ProductsRoutes);
app.use("/category", CategoryRoutes);
app.use("/brands", BrandRoutes);
app.use("/auth", AuthRoutes);
app.use("/cart", CartRoutes);
app.use("/user", UserRoutes);
app.use("/orders", OrderRoutes);
app.use("/admin", AdminRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
