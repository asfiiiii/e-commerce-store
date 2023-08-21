const Category = require("../Models/CategoryModel");
exports.getCategories = async (req, res) => {
  try {
    let Categories = await Category.find({});

    res.status(200).json(Categories); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Fetching Category", error: err.message });
  }
};

exports.createNewCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(200).json(newCategory);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Creating new Category", error: err.message });
  }
};
