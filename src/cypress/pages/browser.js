class Browser {
  // You can use Browser class to do some typical things, like
  // login, etc.

  static getAlias() {
      let aliases = cy.state('aliases');
      cy.log(aliases);
      if (typeof aliases !== 'undefined' && typeof aliases[alias] !== 'undefined') {
      return cy.wrap(aliases[alias]);
    }
    return undefined;
  }

  static getAliases() {
    return cy.state('aliases');
  }

  static aliasExists() {
    let aliases = cy.state('aliases');
    return typeof aliases[alias] !== 'undefined';
  }

  static preserveCookies() {
    let str = [];
    cy.getCookies().then((cook) => {
      cy.log(cook);
      for (let l = 0; l < cook.length; l++) {
        if (cook.length > 0 && l == 0) {
          str[l] = cook[l].name;
          Cypress.Cookies.preserveOnce(str[l]);
        } else if (cook.length > 1 && l > 1) {
          str[l] = cook[l].name;
          Cypress.Cookies.preserveOnce(str[l]);
        }
      }
    })
  }

  static clearCookies() {
    cy.clearCookies();
    Cypress.Cookies.defaults({
      preserve: []
    });
  }
}

export default Browser;