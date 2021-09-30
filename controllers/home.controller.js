const Product = require("../models/Product.model");

const getHomePage = async (req, res) => {
  const productsFeatured = await Product.find({ featured: true });
  res.render("index", {
    featuredProducts: productsFeatured,
  });
};

module.exports = {
  getHomePage,
};
