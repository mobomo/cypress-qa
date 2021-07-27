import executeCommand from '../common/execute-command';

class Browser {
  // You can use Browser class to do some typical things, like
  // login, etc.

  static visit(url) {
    cy.visit(url);
  }

  static clickLink(word) {
    cy.get('a').contains(word).click();
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
}

export default Browser;