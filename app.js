const express = require('express');
const app = express();

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userDb = 'admin';
const passwordDb = 'admin';
const url = `mongodb+srv://${userDb}:${passwordDb}@cluster0-lwoso.mongodb.net/test?retryWrites=true&w=majority`;

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada com sucesso!');
});

mongoose.connection.on('error', (error) => {
    console.log('Exception de Erro: ' + error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Banco de dados offline');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000);

module.exports = app;

