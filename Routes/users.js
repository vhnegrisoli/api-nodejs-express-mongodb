const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/all', (req, res) => {
    User.find({}, (error, data) => {
        if (error) {
            return res.send({ error: 'Erro ao retornar os usuários.' });
        }
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    const request = req.body;
    const { email, password } = request;
    if (!email || !password) {
        return res.send({ error: 'Por favor, informe todos os campos obrigatórios.' })
    }
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: `Erro ao buscar o usuário ${email}` })
        }
        if (data) {
            return res.send({ message: `O usuário ${email} já existe.` })
        }
    });
    User.create(request, (error, data) => {
        if (error) {
            return res.send({ error: 'Erro ao criar usuário.' })
        }

        return res.send(data)
    });
});

// Controller utilizando URI Param
router.get('/find/:email', (req, res) => {
    const { email } = req.params;
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: 'O usuário não existe.' });
        }
        return res.send(data);
    });
});

// Controller utilizando Query Param
router.get('/find', (req, res) => {
    const { email } = req.query;
    User.findOne({ email }, (error, data) => {
        if (error) {
            return res.send({ error: 'O usuário não existe.' });
        }
        return res.send(data);
    });
});


module.exports = router;