const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'Router: Http GET Success' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Router: Http POST Success' });
});

module.exports = router;