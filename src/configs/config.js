let configFile = "devConfig.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prodConfig.js";
}

const config = require("./" + configFile);

export default config;