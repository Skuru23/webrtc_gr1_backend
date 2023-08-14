const router = require("express").Router();
const callroomctr = require("../controllers/callroomController");

const {
    verifyToken,
 //   verifyTokenAndAdmin,
 //   verifyTokenAndUserAuthorization,
  } = require("../controllers/verifyToken");

router.post("/register",verifyToken, callroomctr.register);
router.get("/getAll", verifyToken, callroomctr.getAllRoom);
router.get("/getAll/:userid",verifyToken, callroomctr.getAllOwnRoom);
router.get("/getOne/:roomid", verifyToken, callroomctr.getRoom);
router.get("/getJoined/:userid", verifyToken, callroomctr.getAllJoinedRoom);
router.get("/checkPass/:roomid", verifyToken, callroomctr.checkRoomPass);

module.exports = router;