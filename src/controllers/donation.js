const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const compiledDonation = require('../ethereum/build/Donation.json');

router.get('/', (req, res) => {
    return res.status(status.OK).json({
        abi: compiledDonation.abi,
    });
});

module.exports = router;
