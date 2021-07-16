// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const { cypressConfigResolver } = require('../config/cypress-config-resolver');
const pluginExecuteCommand = require('./plugin-execute-command');
const cucumber = require('cypress-cucumber-preprocessor').default;

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    pluginExecuteCommand,
  });

  on("after:run", function() {
    console.log("hello");
  });

  on("before:browser:launch", (browser = {}, args) => {
    // Disable shared memory when run headless since most CI environment do not support that
    if (config.env.headless && browser.name === "chrome") {
      args.push("--headless");
      args.push("--disable-dev-shm-usage");
      args.push("--disable-gpu");
      args.push("--disable-software-rasterizer");
      args.push("--single-process");
      args.push("--no-zygote");
      args.push("--no-sandbox");
    } else if (config.env.headless && browser.name === "electron") {
      args["headless"] = true;
      args["disable-dev-shm-usage"] = true;
      args["disable-gpu"] = true;
      args["disable-software-rasterizer"] = true;
      args["single-process"] = true;
      args["no-zygote"] = true;
      args["no-sandbox"] = true;
    }
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return cypressConfigResolver();
};
