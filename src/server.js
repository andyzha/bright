import bodyParser from "body-parser";
import csurf from "csurf";
import compression from "compression";
import mongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import express from "express";
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from "morgan";
import passport from 'passport';
import path from "path";
import favicon from "serve-favicon";

import app from "./app";
import config from "./configs/config";
import render from "./server/render";

const debug = require("debug")("brightMainServer");
const server = express();
const mongoSessionStore = mongoStore(session);

// Baisc express middleware
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

server.use(session({
  resave: false,
  saveUninitialized: true, //TODO: switch to false later
  secret: 'bright1bright1bright1',
  store: new mongoSessionStore({
    url: config.db,
    collection : 'sessions'
  })
}));

server.use(passport.initialize());
server.use(passport.session());
//setup passport
require('./server/auth')(passport, server, config);

server.use(csurf({ cookie: true }));

//----Connect to mongodb---------------------------------------------
const connect = function () {
  let options = { server: { socketOptions: { keepAlive: 1 } } };
  console.log(config.db);
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
//auto reconnect
mongoose.connection.on('disconnected', connect);
//----END mongodb----------------------------------------------------

//----setup fetchr, server only registration
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(require("./services/product"));
fetchr.registerService(require("./services/cart"));
fetchr.registerService(require("./services/user"));
// Use the fetchr middleware (will enable requests from /api)
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());
//----END setup fetchr-----------------------------------------------

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

//test code
server.use((req, res, next) => {
  debug('req: ' + JSON.stringify(req.session));
  next();
});
server.use(render);

var serverInstance = server.listen(3000, function () {
  var host = serverInstance.address().address;
  var port = serverInstance.address().port;
  console.log('BrightProto1 %s; listening at http://%s:%s',
   server.get("env"), host, port);
});
