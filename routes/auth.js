const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.route("/re").post(authController.registerUser);

// //REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
// //LOG IN
router.post("/login", authController.loginUser);
// //LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;