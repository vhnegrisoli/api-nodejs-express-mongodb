const express = require('express');
const users = express.Router();

users.get('/', (req, res) => {
    return res.send({ message: 'Users: Http GET Success' });
});

users.post('/', (req, res) => {
    return res.send({ message: 'Users: Http POST Success' });
});

users.post('/create', (req, res) => {
    return res.send({ message: 'Usuário inserido com sucesso!' })
});

module.exports = users;