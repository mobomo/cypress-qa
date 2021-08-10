// Some async example that waits for 5 secs
// This could be a cy.request or some node async stuff
const pluginExecuteCommand = seconds => {
  cy.wait(seconds * 1000);
}

module.exports = pluginExecuteCommand;
