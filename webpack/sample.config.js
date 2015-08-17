var webpack = require('webpack');
var path = require('path');

var nodeModulesDir = path.join(__dirname, "../node_modules");
var assetsPath = path.resolve(__dirname, "../public/assets");

var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

// load minified version of these libs, see:
// https://christianalfoni.github.io/react-webpack-cookbook/Optimizing-development
var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js'
];


var config = {
  devtool: 'inline-source-map',
  entry: [
    "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
    'webpack/hot/only-dev-server',
    './src/client',
  ],
  progress: true,
  output: {
    path: assetsPath,
    // filename: 'bundle.js',
    // publicPath: 'http://localhost:8080/build/',
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/assets/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {}
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ },
      { test: path.resolve(nodeModulesDir, deps[0]), loader: "expose?React" }
    ]
  }
}

deps.forEach(function (dep) {
  var depPath = path.resolve(nodeModulesDir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config
