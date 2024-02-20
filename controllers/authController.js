const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//.ENV
dotenv.config();

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'User not found') {
    errors.email = 'Email is not registered!';
  }

  // incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect!';
  }

  // duplicate email error
  if (err.code === 'ER_DUP_ENTRY') {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation
  if (err.message.includes('Validation error')) {
    Object.values(err.errors).forEach(({ message, path }) => {
      errors[path] = message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: maxAge }
  );
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.createUser(email, password);
    res.status(201).send('User created successfully');
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);
    const accessToken = createToken(user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
      maxAge: maxAge * 1000
    });
    res.status(200).json({ user, accessToken });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
