const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const compiledFactory = require('../ethereum/build/Factory.json');

router.get('/', (req, res) => {
    return res.status(status.OK).json({
        abi: compiledFactory.abi,
    });
});

module.exports = router;
