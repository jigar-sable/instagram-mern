const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static("public"));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// import routes
const post = require("./routes/postRoute");
const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");
const uploadRoute = require("./routes/upload");
// import uploadRoute from "./routes/upload.js";

app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", chat);
app.use("/api/v1", message);
app.use("/api", uploadRoute);

// error middleware
app.use(errorMiddleware);
app.use((err, req, res, next) => {
  console.error("Global error:", err); // <-- Add this line
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
