import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./dev.config";

const debug = require("debug")("brightProto1");

const WEBPACK_HOST = process.env.HOST || "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

const serverOptions = {
  contentBase: `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
  quiet: false,
  noInfo: true,
  hot: true,
  stats: { colors: true },
  publicPath: config.output.publicPath
};

const webpackDevServer = new WebpackDevServer(webpack(config), serverOptions);

webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, () => {
  debug("Webpack development server listening on %s:%s", WEBPACK_HOST, WEBPACK_PORT);
});
