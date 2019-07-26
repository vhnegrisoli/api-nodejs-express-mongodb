const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send({ message: 'Http GET: Success!' })
});

app.post('/', (req, res) => {
    return res.send({ message: 'Http POST: Success!' })
});

app.listen(3000);

module.exports = app;

