import express from "express";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import morgan from "morgan";
import csurf from "csurf";

import app from "./app";
import render from "./server/render"
const server = express();

// Baisc express middleware
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

server.use(csurf({ cookie: true }));

// setup fetchr, server only registration
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(require("./services/product"));
// Use the fetchr middleware (will enable requests from /api)
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

// On production, use the public directory for static files
// This directory is created by webpack on build time.
if (server.get("env") === "production") {
  server.use(express.static(path.resolve(__dirname, "../public"), {
    maxAge: 365 * 24 * 60 * 60
  }));
}

// On development, serve the static files from the webpack dev server.
if (server.get("env") === "development") {
  require("../webpack/webpack-dev-server");
  // open static file serving for test data
  server.use('/assets', express.static(path.resolve(__dirname, "./assets"), {}));
}

server.use(render);

var serverInstance = server.listen(3000, function () {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  console.log('BrightProto1 %s; listening at http://%s:%s',
   server.get("env"), host, port);
});
