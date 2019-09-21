const express = require("express");

const breadsRouter = require("./breads/breadsRouter.js");

const server = express();

server.use(express.json());

server.use("/breads", breadsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's working!" });
});

module.exports = server;
