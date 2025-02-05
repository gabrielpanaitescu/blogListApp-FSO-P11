const { MONGODB_URI } = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB server");
  })
  .catch((error) => {
    logger.error("Connecting to MongoDB failed", error.message);
  });

app.use(cors());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
