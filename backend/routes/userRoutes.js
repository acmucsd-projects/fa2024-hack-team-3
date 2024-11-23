const express = require('express');
const { createUser } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', createUser);

module.exports = router;