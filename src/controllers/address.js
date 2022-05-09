const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const deployAddressModel = require('../models/deployedAddress');

router.get('/', async (req, res) => {
    try {
        const result = await deployAddressModel.latest();
        return res.status(status.OK).json({
            data: result.address,
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
