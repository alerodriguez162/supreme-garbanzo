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
  try {
    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOne({ user: currentUser._id }).populate(
      "products.product"
    );

    res.render("checkout/checkout", {
      products: currentCart.products,
      total: calculateAmount(currentCart.products),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const submitCheckout = async (req, res) => {
  try {
    console.log(req.body);
    // const token = req.body.stripeToken; // Using Express

    // const currentUser = req.session.currentUser;

    // const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");
    // const charge = await stripe.charges.create({
    //   amount: calculateAmount(currentCart.products),
    //   currency: "mxn",
    //   description: "Example charge",
    //   source: token,
    // });

    res.status(200).json({ name: "success" });
  } catch (error) {
    res.status(200).json(error.message);
  }
};

module.exports = {
  createCheckout,
  submitCheckout,
};
