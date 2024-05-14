/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';
const url = Cypress.config('baseUrl') || '';

describe('profile page, provide chosen name', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/select-profile-type`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Select your Profile Type');
  });

  it('should set profile as private', () => {
    cy.get(ProfileElements.profileTypeSelect).click();
    cy.get(ProfileElements.profileOption).click();
    cy.get(ProfileElements.continueButton).should('be.enabled');
  });

  it('should redirect to dashboard after create profile', () => {
    cy.get(ProfileElements.profileTypeSelect).click();
    cy.get(ProfileElements.profileOption).click();
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h1Title).should('have.text', 'dashboard works!');
  });

  it('should close profile creation and redirect to dashboard', () => {
    cy.get(ProfileElements.closeButton).click();
    cy.get(CommonElements.h1Title).should('have.text', 'dashboard works!');
  });

  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Chosen a Profile Name');
  });
});
