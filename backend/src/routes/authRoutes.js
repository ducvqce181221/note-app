
const express = require('express');
const router = express.Router();
const { createAccount, login, getUser } = require('../controllers/AuthController');
const { verifyToken } = require('../utils/jwt');


router.post('/create-account', createAccount);
router.post('/login', login);
router.get('/get-user', verifyToken, getUser);


module.exports = router;