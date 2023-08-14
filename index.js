const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const callRoomRoute = require("./routes/callroom");
const roomcrud = require("./routes/callroomcrud");

dotenv.config();
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch {
    console.log("Error, can't connect to DB");
  }
};
connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/callroom", callRoomRoute);
app.use("/roomcrud", roomcrud)

app.listen(8000, () => {
  console.log("Server is running");
});
