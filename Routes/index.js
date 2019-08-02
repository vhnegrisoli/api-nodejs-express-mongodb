const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    return res.send({ message: 'Router: Http GET Success' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Router: Http POST Success' });
});

module.exports = router;