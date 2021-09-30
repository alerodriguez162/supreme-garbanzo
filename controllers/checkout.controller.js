const stripe = require("stripe")(process.env.STRIPE_SECRET);

const Cart = require("../models/Cart.model");

const calculateAmount = (items) => {
  let amount = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return amount;
};

const createCheckout = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");

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
    const { firstName, lastName, email, address, address2, state, zip, sameAddress, cardName, stripeToken } = req.body;
    // const token = req.body.stripeToken; // Using Express

    const currentUser = req.session.currentUser;

    const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");
    const charge = await stripe.charges.create({
      amount: calculateAmount(currentCart.products) * 100,
      currency: "mxn",
      description: "Example charge",
      source: stripeToken,
    });
    let statusCart = 0;
    if (charge.status === "succeeded") statusCart = 2;
    else console.log(charge.status);
    let newCart = await Cart.findOneAndUpdate(
      { user: currentUser._id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        address2: address2,
        state: state,
        status: statusCart,

        zip: zip,
        sameAddress: sameAddress,
        cardName: cardName,
        stripeToken: stripeToken,
      },
      {
        new: true,
      }
    ).populate("products.product");

    if (statusCart === 2) {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let newDate = "";
      if (month < 10) {
        newDate = `${day}-0${month}-${year}`;
      } else {
        newDate = `${day}-${month}-${year}`;
      }
      res.render("checkout/orderComplete", {
        date: newDate,
        charge: charge,
        cart: newCart,
        products: newCart.products,
        total: calculateAmount(currentCart.products),
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = {
  createCheckout,
  submitCheckout,
};
