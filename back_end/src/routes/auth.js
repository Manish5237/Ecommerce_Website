const express = require('express');

const router = express.Router();
const User = require('../models/user');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../controller/validator/auth');


router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

// router.post('/profile', (req,res)=>{
//     res.status(200).json({ user : 'profile' })
// });


// router.post('/signup',signup);
// router.post('/signup',signup);






module.exports = router;