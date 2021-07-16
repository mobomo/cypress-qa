const { cypressConfigResolver } = require('../config/cypress-config-resolver');

// Some async example that waits for 5 secs
// This could be a cy.request or some node async stuff
const pluginExecuteCommand = seconds =>
// eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    // do something.
    setTimeout(function(){ resolve() }, seconds * 1000);
  });

module.exports = pluginExecuteCommand;
