const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const USERS_ERROR_MESSAGE = 'Erro ao  buscar os usuários.';
const USER_NOT_FOUND_MESSAGE = 'Erro ao  buscar o usuário.';
const USER_NOT_CREATED_MESSAGE = 'Erro ao criar usuário.';
const USER_EXISTS_MESSAGE = 'Esse usuário já existe.';
const USER_NOT_EXISTS_MESSAGE = 'Esse usuário não existe.';
const NOT_ENOUGH_FIELDS_MESSAGE = 'Por favor, informe todos os campos.';
const WRONG_PASSWORD_MESSAGE = 'Senha inválida.';
const APP_SECRET = 'user_password_jwt_123456';

const createUserToken = userId => {
  return jwt.sign({ id: userId }, APP_SECRET, { expiresIn: '7d' });
};

router.get('/all', async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(400).send({ error: USERS_ERROR_MESSAGE });
  }
});

router.post('/create', async (req, res) => {
  const request = req.body;
  const { email, password, name } = request;
  if (!email || !password || !name) {
    return res.status(400).send({ error: NOT_ENOUGH_FIELDS_MESSAGE });
  }
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ message: USER_EXISTS_MESSAGE });
    }
    const user = await User.create(request);
    user.password = undefined;
    return res
      .status(201)
      .send({ user, token: createUserToken(user.id), auth_data: res.auth_data });
  } catch (error) {
    return res.status(400).send({ error: USER_NOT_CREATED_MESSAGE });
  }
});

// Controller utilizando URI Param
router.get('/find/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: USER_NOT_FOUND_MESSAGE });
  }
});

// Controller utilizando Query Param
router.get('/find', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: USER_NOT_FOUND_MESSAGE });
  }
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: NOT_ENOUGH_FIELDS_MESSAGE });
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).send({ error: USER_NOT_EXISTS_MESSAGE });
    }
    const password_ok = await bcrypt.compare(password, user.password);
    if (!password_ok) {
      return res.status(401).send({ error: WRONG_PASSWORD_MESSAGE });
    }
    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id), auth_data: res.auth_data });
  } catch (error) {
    return res.status(400).send({ error: USER_NOT_FOUND_MESSAGE });
  }
});

module.exports = router;
