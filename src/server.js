import express from "express";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import morgan from "morgan";
// import csurf from "csurf";

import render from "./server/render"
const server = express();

// Baisc express middleware
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

server.use(render);

// On development, serve the static files from the webpack dev server.
if (server.get("env") === "development") {
  require("../webpack/webpack-dev-server");
}

var serverInstance = server.listen(3000, function () {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  console.log('BrightProto1 ${server.get("env")}; listening at http://%s:%s', host, port);
});
