const jwt = require('jsonwebtoken');

const USER_UNAUTHORIZED = 'Usuário não autenticado.';
const USER_INVALID_TOKEN = 'Token inválida.';
const APP_SECRET = 'user_password_jwt_123456';

const auth = (req, res, next) => {
  const token_header = req.headers.auth;
  if (!token_header) {
    return res.status(401).send({ message: USER_UNAUTHORIZED });
  }
  jwt.verify(token_header, APP_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).send({ message: USER_INVALID_TOKEN });
    }
    res.locals.auth_data = decoded;
    return next();
  });
};

module.exports = auth;
