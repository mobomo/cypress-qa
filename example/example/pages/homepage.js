const SEARCH_FIELD = 'input[type=text]';
const SEARCH_BUTTON = 'input[value="Google Search"]';
const FEEL_LUCKY_BUTTON = `input[value="I'm Feeling Lucky"]`;

class Homepage {
  static visit() {
    cy.visit('/');
  }

  static type(query) {
    cy.get(SEARCH_FIELD) // 2 seconds
      .type(query);
  }

  static pressFeelLucky() {
    cy.get(FEEL_LUCKY_BUTTON).first().click();
  }
}

export default Homepage;
