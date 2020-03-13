const express = require("express");
const helmet = require("helmet");
const logger = require("./logger");
const server = express();
const projectsRouter = require("./projects/projectsRouter");
// const actionsRouter = require("./actions/actionsRouter");

server.use(helmet());
server.use(express.json());
server.use("/api/projects", logger, projectsRouter);
// server.use("/api/actions", logger, actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
