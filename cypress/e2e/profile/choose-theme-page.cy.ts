/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';
const url = Cypress.config('baseUrl') || '';

describe('profile page, choose theme', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/select-theme`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a theme');
  });

  it('should select navy theme and go to next page', () => {
    cy.get(ProfileElements.navyThemeBox).click();
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Let’s customize your Profile Avatar');
  });
  
  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Validate Phone Number for Your New Profile');
  });
});
