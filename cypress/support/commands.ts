/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
declare namespace Cypress {
    interface Chainable {
      goToHomePage(): void;
      sauceLogin(userName: string, password: string): void;
    }
  }

const goToHomePage: Cypress.Chainable["goToHomePage"] = () => {
    cy.visit(Cypress.env("homeUrl"));
  };
  
const saucelogin: Cypress.Chainable["sauceLogin"] = (userName: string, password: string) => {
  cy.dataSession({
    'name': 'login', setup() {
      cy.visit(Cypress.env("sauceLogin"));
      cy.get("#user-name").type(userName);
      cy.get("#password").type(password);
      cy.get("#login-button").click();
      cy.url().should('contain', "/inventory.html")
      cy.wait(3000);
      cy.getCookie('session-username').should('exist').then(cookie => {
        return {
          cookie,
          userName
        }
      })
    },
    // validate(saved) {
    //   return cy.task('login', saved.userName)
    // },
    recreate(saved) {
      cy.setCookie('session-username', saved.cookie.value)
      cy.visit("https://www.saucedemo.com/inventory.html")
    },
    
    //shareAcrossSpecs: true
  })
}
// -- This is a parent command --
Cypress.Commands.add("goToHomePage", goToHomePage);

Cypress.Commands.add("sauceLogin", saucelogin);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }