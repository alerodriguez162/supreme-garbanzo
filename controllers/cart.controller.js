const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const currentUser = req.session.currentUser;

  const currentCart = await Cart.findOneAndUpdate(
    { user: currentUser._id },
    {
      $set: {
        products: {
          product: productId,
          quantity: quantity,
        },
      },
    },
    { new: true }
  );
  res.status(200).json(currentCart);
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOneAndUpdate(
      { user: currentUser._id },
      {
        $pull: {
          products: {
            product: productId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(currentCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;

    const cartFind = await Cart.findOne({ user: currentUser._id }).populate("products.product");

    res.status(200).json(cartFind);
  } catch (error) {}
};

const clearCart = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOneAndUpdate(
      { user: currentUser._id },
      {
        $set: {
          products: [],
        },
      },
      { new: true }
    );
    res.status(200).json(currentCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
