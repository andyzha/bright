let configFile = "devConfig.js";

if (process.env.NODE_ENV === 'production') {
  configFile = "prodConfig.js";
} else if (process.env.NODE_ENV === 'unittest') {
  configFile = 'unitTestConfig.js';
}

const config = require("./" + configFile);

export default config;