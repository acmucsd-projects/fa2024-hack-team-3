const express = require('express');
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require('../controllers/userControllers');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;