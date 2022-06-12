const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const AuthError = require('../errors/auth_error');

function auth(req, res, next) {
  const token = req.cookies.jwt; 
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Авторизация не прошла.');
  }

  req.user = payload;

  next();
}

module.exports = auth;
