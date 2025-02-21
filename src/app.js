require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const app = express();
const port = process.env.PORT || 4000; // Default to 4000 if PORT is not set

app.use(
  cors({
    origin: ["http://localhost:3000", "https://devtinder-web-opqj.onrender.com"],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// Importing Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");

// Using Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);

// Initialize WebSocket
initializeSocket(server);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Connect to Database and Start Server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
  });
