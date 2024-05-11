/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
const url = Cypress.config('baseUrl') || '';

describe('select profile type', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile`);
  });

  it('should have to load the login page', () => {
    cy.get(CommonElements.h3Title).should('have.text', 'ProfileOrganization');
  });
});
