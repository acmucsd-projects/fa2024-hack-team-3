const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getAllUsers, getUser, createUser, loginUser, checkUsername, checkEmail, deleteUser, updateUser, uploadProfilePicture, changePassword, getLoggedInUser, updateCourses, getUserProfile, getUserCourses} = require('../controllers/userControllers');
const authenticate = require('../middleware/authenticate');


const router = express.Router();

router.get('/', getAllUsers);


// router.get('/', (req, res) => {
//     res.status(200).json({ message: "GET request to /api/users works!" });
// });
// router.get('/:id', getUser);


router.post('/', (req, res, next) => {
    console.log("POST /users called");
    next();
}, createUser);
router.post('/login', loginUser);
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);
router.patch("/change-password", authenticate, changePassword);
router.get('/me', authenticate, getLoggedInUser);
router.patch('/me/courses', authenticate, updateCourses);
router.get('/profile', authenticate, getUserProfile);

router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
router.get('/:id/courses', getUserCourses);
router.post("/:id/upload", upload.single("file"), uploadProfilePicture);
router.get('/:id', getUser);
module.exports = router;
