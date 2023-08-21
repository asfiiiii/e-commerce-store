const express = require("express");
const { ConnectDB } = require("./connect_db");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const BrandRoutes = require("./Routes/BrandsRoutes");
const cors = require("cors");
const app = express();

// Database Connection
ConnectDB();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/products", ProductsRoutes);
app.use("/category", CategoryRoutes);
app.use("/brands", BrandRoutes);
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
