const Product = require("../models/Product.model");

const getProducts = async (req, res, next) => {
  try {
    const querys = req.query;

    if (!querys) {
      const products = await Product.find({});
      console.log(products);
      res.render("plp/plp", { products: products });
    } else {
      const products = await Product.find({ title: { $regex: querys.search || "", $options: "i" } });
      res.render("plp/plp", { products: products });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
};
