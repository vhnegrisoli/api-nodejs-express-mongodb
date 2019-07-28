const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

const USERS_ERROR_MESSAGE = 'Erro ao  buscar os usuários.';
const USER_NOT_FOUND_MESSAGE = 'Erro ao  buscar o usuário.';
const USER_NOT_CREATED_MESSAGE = 'Erro ao criar usuário.';
const USER_EXISTS_MESSAGE = 'Esse usuário já existe.';
const USER_NOT_EXISTS_MESSAGE = 'Esse usuário não existe.';
const NOT_ENOUGH_FIELDS_MESSAGE = 'Por favor, informe todos os campos.';
const WRONG_PASSWORD_MESSAGE = 'Senha inválida.';

router.get('/all', (req, res) => {
    User.find({}, (error, data) => {
        if (error) {
            return res.send({ error: USERS_ERROR_MESSAGE });
        }
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    const request = req.body;
    const { email, password } = request;
    if (!email || !password) {
        return res.send({ error: NOT_ENOUGH_FIELDS_MESSAGE });
    }
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: USER_NOT_FOUND_MESSAGE });
        }
        if (data) {
            return res.send({ message: USER_EXISTS_MESSAGE });
        }
    });
    User.create(request, (error, data) => {
        if (error) {
            return res.send({ error: USER_NOT_CREATED_MESSAGE });
        }
        data.password = undefined
        return res.send(data)
    });
});

// Controller utilizando URI Param
router.get('/find/:email', (req, res) => {
    const { email } = req.params;
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: USER_NOT_FOUND_MESSAGE });
        }
        return res.send(data);
    });
});

// Controller utilizando Query Param
router.get('/find', (req, res) => {
    const { email } = req.query;
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: USER_NOT_FOUND_MESSAGE });
        }
        return res.send(data);
    });
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send({ error: NOT_ENOUGH_FIELDS_MESSAGE });
    }
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: USER_NOT_FOUND_MESSAGE });
        }
        if (!data) {
            return res.send({ error: USER_NOT_EXISTS_MESSAGE });
        }
        bcrypt.compare(password, data.password, (error, same) => {
            if (!same) {
                return res.send({ error: WRONG_PASSWORD_MESSAGE })
            }
            data.password = undefined
            return res.send(data);
        });
    }).select('+password')
});

module.exports = router;