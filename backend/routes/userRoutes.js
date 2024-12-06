const express = require('express');
const { getAllUsers, getUser, createUser, loginUser, checkUsername, checkEmail, deleteUser, updateUser } = require('../controllers/userControllers');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);



module.exports = router;
