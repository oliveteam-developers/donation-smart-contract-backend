const express = require('express');
const router = express.Router();
const status = require('../constants/statusCode');
const deployAddressModel = require('../models/deployedAddress');
const compiledDonation = require('../ethereum/build/Donation.json');
const compiledFactory = require('../ethereum/build/Factory.json');

router.get('/', async (req, res) => {
    try {
        const result = await deployAddressModel.latest();
        return res.status(status.OK).json({
            address: result.address,
            factory: {
                abi: compiledFactory.abi,
            },
            donation: {
                abi: compiledDonation.abi,
            },
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
