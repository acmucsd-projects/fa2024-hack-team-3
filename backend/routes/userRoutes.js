const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getAllUsers, getUser, createUser, loginUser, checkUsername, checkEmail, deleteUser, updateUser, uploadProfilePicture, changePassword } = require('../controllers/userControllers');
const authenticate = require('../middleware/authenticate');

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
router.patch("/change-password", authenticate, changePassword);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.post("/:id/upload", upload.single("file"), uploadProfilePicture);

module.exports = router;
