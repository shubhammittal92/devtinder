require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

app.use(
  cors({
    origin:"https://statuesque-lily-6b6a4f.netlify.app",
    // jsdsns
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

const connectDB = async () => {
  console.log("DB_CONNECTION_SECRET:", process.env.DB_CONNECTION_SECRET);
  try {
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

// Connect to Database and Start Server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Listening on port 3000");
  });
}).catch(err => {
  console.error("Database connection failed:", err.message);
});