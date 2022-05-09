const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        message: 'Donation Smart Contract'
    });
});

router.use('/factory', require(`${__dirname}/controllers/factory`));
router.use('/donation', require(`${__dirname}/controllers/donation`));
router.use('/address', require(`${__dirname}/controllers/address`));

module.exports = router;