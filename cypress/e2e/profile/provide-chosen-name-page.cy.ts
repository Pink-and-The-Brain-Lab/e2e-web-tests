/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';
const url = Cypress.config('baseUrl') || '';

describe('profile page, provide chosen name', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/provide-chosen-name`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Provide your Chosen Name');
  });

  it('should provide a name and enable continue button', () => {
    const text = 'Chosenname';
    cy.get(CommonElements.emailInput).type(text);
    cy.get(ProfileElements.chosenName).should('have.text', text);
    cy.get(ProfileElements.continueButton).should('be.enabled');
  });

  it('should provide a samll name and keep continue button disabled', () => {
    const text = 'abc';
    cy.get(CommonElements.emailInput).type(text);
    cy.get(ProfileElements.chosenName).should('have.text', text);
    cy.get(ProfileElements.continueButton).should('be.disabled');
  });

  it('should go to next page', () => {
    const text = 'Chosenname';
    cy.get(CommonElements.emailInput).type(text);
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Chosen a Profile Name');
  });
  
  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Let’s customize your Profile Avatar');
  });
});
