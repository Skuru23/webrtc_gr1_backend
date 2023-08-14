const router = require("express").Router();
const callroomctr = require("../controllers/callroomController");
const { verifyToken } = require("../controllers/verifyToken");

router.post("/create", verifyToken, callroomctr.register);

module.exports = router;