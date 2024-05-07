/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';
const url = Cypress.config('baseUrl') || '';

describe('profile page, select avatar and color', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/customize-avatar`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Let’s customize your Profile Avatar');
  });

  it('should select one color and go to next page', () => {
    cy.get(ProfileElements.colorOption).click();
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Provide your Chosen Name');
  });
  
  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a theme');
  });
});
