const Product = require("../models/Product.model");

const getProducts = async (req, res, next) => {
  try {
    const params = req.params;

    if (!params) {
      const products = await Product.find({});
      console.log(products);
      res.render("plp/plp", { products: products });
    } else {
      const products = await Product.find({});
      res.render("plp/plp", { products: products });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
};
