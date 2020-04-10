const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const projectsRouter = require("../projects/projectsRouter");
const actionsRouter = require("../actions/actionsRouter");

server.use(helmet());
server.use(morgan("combined"));
server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
