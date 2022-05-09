const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const compiledFactory = require('../ethereum/build/Factory.json');

router.get('/abi', (req, res) => {
    return res.status(status.OK).json({
        data: compiledFactory.abi,
    });
});

module.exports = router;
