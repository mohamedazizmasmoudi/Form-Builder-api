const express = require("express");
const {
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    hasAuthorization
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { userById } = require('../controllers/user');

const router = express.Router();


router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
router.get("/user/photo/:userId", userPhoto);



// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
