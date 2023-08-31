const Product = require("../Models/ProductsModel");

exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    console.log(req.user);
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
    }
    const data = await query.exec();

    res.status(200).json(data); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Fetching products", error: err.message });
  }
};

// exports.getAllProducts = async (req, res) => {
//   try {
//     let query = Product.find({});
//     console.log(req.user);

//     if (req.query._sort && req.query._order) {
//       query = query.sort({ [req.query._sort]: req.query._order });
//     }
//     if (req.query.category) {
//       query = query.find({ category: req.query.category });
//     }
//     if (req.query.brand) {
//       query = query.find({ brand: req.query.brand });
//     }

//     // Pagination handling
//     const page = parseInt(req.query._page) || 1;
//     const itemsPerPage = parseInt(req.query._item);
//     const skip = (page - 1) * itemsPerPage;

//     const data = await query.skip(skip).limit(itemsPerPage).exec();

//     res.status(200).json(data); // Respond with the fetched products
//   } catch (err) {
//     res
//       .status(400)
//       .json({ message: "Error Fetching products", error: err.message });
//   }
// };

exports.createNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct); // Respond with the created product
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating new product", error: err.message });
  }
};

exports.getProductByid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Fetching specific product", error: err.message });
  }
};

exports.updateProductByid = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Updating specific product", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deleteProduct); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Deleting specific product", error: err.message });
  }
};
