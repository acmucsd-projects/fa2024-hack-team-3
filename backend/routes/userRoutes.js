const express = require('express');
const { createUser, loginUser, checkUsername, checkEmail } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log("POST /users called");
    next();
}, createUser);

router.post('/login', loginUser);

router.post('/check-username', checkUsername);

router.post('/check-email', checkEmail);

// router.post('/', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }, createUser);

module.exports = router;