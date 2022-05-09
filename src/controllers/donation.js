const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const compiledDonation = require('../ethereum/build/Donation.json');

router.get('/abi', (req, res) => {
    return res.status(status.OK).json({
        data: compiledDonation.abi,
    });
});

module.exports = router;
