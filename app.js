const express = require('express');
const app = express();

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

// Primeiras requisições
/*
app.get('/', (req, res) => {
    let obj = req.query;
    return res.send({ message: `Http GET: Success! Response is :${obj.nome} with ${obj.idade}!` })
});

app.post('/', (req, res) => {
    return res.send({ message: 'Http POST: Success!' })
});
**/
app.listen(3000);

module.exports = app;

