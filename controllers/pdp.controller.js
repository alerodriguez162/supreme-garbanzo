const Product = require("../models/Product.model");

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    console.log(product);
    res.render("pdp/pdp", product);
  } catch (error) {
    res.status(404).send(message.error);
  }
};

module.exports = {
  getProductById,
};
