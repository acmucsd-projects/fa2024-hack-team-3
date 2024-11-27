const express = require('express');
const { createUser } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log("POST /users called");
    next();
}, createUser);

module.exports = router;