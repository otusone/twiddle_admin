const express = require('express');
const router = express.Router();


// const admin = require('./admin');
// router.use('/otusone/admin', admin);


const user = require('./user');
router.use('/user', user);


const auth = require('./authRoutes');
router.use('/auth', auth);

module.exports = router;
