const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const getLoginForm = (req, res) => res.render("auth/login");

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || !email.length || !password.length) throw new Error("Uno o mas campos son erroneos");
    const foundUser = await User.findOne({ email });

    if (!foundUser) throw new Error("El usuario o la contraseña son erróneas. Intenta nuevamente");

    const passwordMath = await bcryptjs.compareSync(password, foundUser.passwordHash);

    if (!passwordMath) throw new Error("La contraseña es incorrecta. Intenta nuevamente");

    req.session.currentUser = foundUser;

    const findCart = await Cart.findOne({ user: foundUser._id });
    if (!findCart) {
      await Cart.create({
        user: foundUser._id,
        status: 0,
        items: [],
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.render("auth/login", { errorMessage: error.message });
  }
};

const getForgotPasswordForm = (req, res) => res.render("auth/forgotPassword");

const postForgotPassword = (req, res) => {};

const getSignUpForm = (req, res) => res.render("auth/signup");

const postSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password || !lastName || !firstName.length || !email.length || !password.length || !lastName.length) throw new Error("Uno o mas campos son erroneos");

    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log(firstName, lastName, email, password);
    await User.create({
      name: firstName,
      lastName: lastName,
      email: email,
      passwordHash: hashedPassword,
      roles: ["customer"],
    });

    res.redirect("/auth/login");
  } catch (error) {
    res.render("auth/signup", { errorMessage: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

module.exports = {
  getLoginForm,
  postLogin,
  getForgotPasswordForm,
  postForgotPassword,
  getSignUpForm,
  postSignUp,
  logout,
};
