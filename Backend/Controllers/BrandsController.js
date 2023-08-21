const Brand = require("../Models/BrandsModel");
exports.getAllBrands = async (req, res) => {
  try {
    let allBrands = await Brand.find({});

    res.status(200).json(allBrands); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Fetching Brands", error: err.message });
  }
};

exports.createNewBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();

    res.status(200).json(newBrand);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Creating new Brand", error: err.message });
  }
};
