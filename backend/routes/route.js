const express = require('express');
const { helloWorld } = require('../controllers/controller');

const router = express.Router();

router.get('/', helloWorld);

module.exports = router;