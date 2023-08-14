const CallRoom = require("../models/CallRoom");
const User = require("../models/User");

const callRoomController = {
  register: async (req, res) => {
    try {
      const name = req.body.name;
      if (!req.body.name) {
        return res.status(200).json("Khong co data");
      }
      const newCallRoom = new CallRoom({
        name: req.body.name,
        registor: req.body.registor,
        participants: req.body.participants,
        startTime: req.body.startTime,
        password: req.body.password,
      });
      const callroom = await newCallRoom.save();
      return res.status(200).json(callroom);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllRoom: async (req, res) => {
    try {
      const rooms = await CallRoom.find();
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllOwnRoom: async (req, res) => {
    try {
      const rooms = await CallRoom.find({ registor: req.params.userid });
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getRoom: async (req, res) => {
    try {
      const room = await CallRoom.findById(req.params.roomid);
      if (room.password == null) {
        return res.status(200).json(room);
      } else {
        const data = {
          name: room.name,
          registor: room.registor,
          participants: room.participants,
          startTime: room.startTime,
          password: "1",
        };
        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllJoinedRoom: async (req, res) => {
    try {
      const user = await User.findById(req.params.userid);
      const rooms = await CallRoom.find({
        participants: { $elemMatch: { $eq: `${user.username.toString()}` } },
      });
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  checkRoomPass: async (req, res) => {
    try {
      const room = await CallRoom.findById(req.params.roomid);
      if (room.password == null) return res.status(200).json(true);
      else {
        const isAllow = room.password.toString() === req.headers.password;
        return res.status(200).json(isAllow);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = callRoomController;
