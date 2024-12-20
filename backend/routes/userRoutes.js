const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getAllUsers, getUser, createUser, loginUser, checkUsername, checkEmail, deleteUser, updateUser, uploadProfilePicture } = require('../controllers/userControllers');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

router.post('/', (req, res, next) => {
    console.log("POST /users called");
    next();
}, createUser);
router.post('/login', loginUser);
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.post("/:id/upload", upload.single("file"), uploadProfilePicture);
module.exports = router;
