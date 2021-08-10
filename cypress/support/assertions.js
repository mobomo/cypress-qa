/* global chai */
// because this file is imported from cypress/support/index.js
// that means all other spec files will have this assertion plugin
// available to them because the supportFile is bundled and served
// prior to any spec files loading

/**
 * An element exists and is visible.
 * Differs from visible in that it will not fail on being unable to find an element
 *
 * @see https://www.chaijs.com/guide/helpers/
 * @example
 ```
 expect('foo').to.be.usable()
 expect('bar').to.not.be.usable()
 cy.wrap('foo').should('be.usable')
 cy.wrap('bar').should('not.be.usable')
 ```
 * */
const isUsable = (_chai, utils) => {
    function assertIsUsable (options) {
        this.assert(
            Cypress.dom.isElement(this._obj) && Cypress.dom.isVisible(this._obj),
            'expected #{this} to be usable',
            'expected #{this} to not be usable',
            this._obj
        )
    }

    _chai.Assertion.addMethod('usable', assertIsUsable)
}

// registers our assertion function "isFoo" with Chai
chai.use(isUsable)