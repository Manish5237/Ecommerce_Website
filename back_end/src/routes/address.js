const express = require('express');
const { requireSignin, userMiddleware } = require('../common_middleware');
const router = express.Router();
const { addAddress, getAddress } = require('../controller/address');

router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

module.exports = router;