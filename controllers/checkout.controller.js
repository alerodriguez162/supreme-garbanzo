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

  // const customer = await stripe.customers.create();

  // const paymentIntent = await stripe.paymentIntents.create({
  //   customer: customer.id,
  //   setup_future_usage: "off_session",
  //   amount: calculateAmount(currentCart.products),
  //   currency: "MXN",
  // });

  res.render("checkout/checkout", {
    cart: currentCart,
  });
};

const submitCheckout = async (req, res) => {
  try {
    const token = req.body.stripeToken; // Using Express

    const charge = await stripe.charges.create({
      amount: 999,
      currency: "usd",
      description: "Example charge",
      source: token,
    });

    res.status(200).json(charge);
  } catch (error) {}
};

module.exports = {
  createCheckout,
  submitCheckout,
};
