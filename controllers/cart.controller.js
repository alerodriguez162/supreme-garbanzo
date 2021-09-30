const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");
const calculateAmount = (items) => {
  let amount = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return amount;
};
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const currentUser = req.session.currentUser;

    const findCart = await Cart.findOne({ user: currentUser._id });
    let updatedObject = {};
    let filter = {};
    if (findCart.products && findCart.products.length && findCart.products.some((e) => e.product?.toString() === productId)) {
      updatedObject = {
        $set: {
          "products.$.quantity": quantity,
        },
      };
      filter = { user: currentUser._id, "products.product": productId };
    } else {
      updatedObject = {
        $push: {
          products: {
            product: productId,
            quantity: quantity,
          },
        },
      };
      filter = { user: currentUser._id };
    }
    await Cart.findOneAndUpdate(filter, updatedObject, { new: true });
    res.redirect("/cart");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const currentUser = req.session.currentUser;

    await Cart.findOneAndUpdate(
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
    res.redirect("/cart");
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

    res.render("cart/cart", {
      products: cartFind.products.length > 0 ? cartFind.products : null,
      total: calculateAmount(cartFind.products),
    });
  } catch (error) {}
};

const clearCart = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;

    await Cart.findOneAndUpdate(
      { user: currentUser._id },
      {
        $set: {
          products: [],
        },
      },
      { new: true }
    );
    res.redirect("/cart");
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
