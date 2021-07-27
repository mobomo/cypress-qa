import executeCommand from '../common/execute-command';

class Browser {
  // You can use Browser class to do some typical things, like
  // login, etc.

  static visit(url) {
    cy.visit(url);
  }

  static clickButton(word) {
    cy.get('a, input[type="submit"], button').filter(':visible').contains(word).click();
  }

  static clickLink(word) {
    cy.get('a').contains(word).click();
  }

  static clickElement(element) {
    cy.get(element).click();
  }

  static click(word) {
    cy.contains(word).click();
  }

  static scrollTo(word) {
    cy.contains(word).scrollIntoView().should('be.visible');
  }

  static wait(seconds) {
    executeCommand(seconds);
  }

  static textIsVisible(word) {
    cy.contains(word).should('be.visible');
  }

  static elementIsVisible(element) {
    cy.get(element).should('be.visible');
  }

  static elementWithTextIsVisible(element, text) {
    cy.get(element).contains(text).should('be.visible');
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

  static uploadFile(fileName, fileType = '', selector) {
    cy.get(selector).then(subject => {
      cy.fixture(fileName, 'base64')
          .then(Cypress.Blob.base64StringToBlob)
          .then(blob => {
            const el = subject[0]
            const testFile = new File([blob], fileName, {type: fileType})
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
          });
    })
    cy.get(selector).trigger('change');
  }
}

export default Browser;