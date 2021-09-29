const stripe = require("stripe")(process.env.STRIPE_SECRET);

const Cart = require("../models/Cart.model");

const calculateAmount = (items) => {
  let amount = items.reduce((acc, item) => {
    console.log(item.product.price);
    return acc + item.product.price;
  }, 0);
  return Math.round(amount * 100);
};

const createCheckout = async (req, res) => {
  const currentUser = req.session.currentUser;

  const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");

  res.render("checkout/checkout", {
    cart: currentCart,
  });
};

const submitCheckout = async (req, res) => {
  try {
    const token = req.body.stripeToken; // Using Express

    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");
    const charge = await stripe.charges.create({
      amount: calculateAmount(currentCart.products),
      currency: "mxn",
      description: "Example charge",
      source: token,
    });

    res.status(200).json(charge);
  } catch (error) {
    res.status(200).json(error.message);
  }
};

module.exports = {
  createCheckout,
  submitCheckout,
};
