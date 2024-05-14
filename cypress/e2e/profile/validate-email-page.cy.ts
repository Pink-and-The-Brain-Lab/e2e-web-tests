/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';
const invalidEmail = 'error@mail.com';

describe('profile page, set email', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/choose-email`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Choose an Email for Your New Profile');
  });

  it('should verify email and receive email is unavailable', () => {
    cy.get(CommonElements.emailInput).type(invalidEmail);
    cy.get(CommonElements.submitButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Email unavailable ');
    cy.get(ProfileElements.footerButton).should('be.disabled');
  });

  it('should verify email and receive email is available', () => {
    cy.get(CommonElements.emailInput).type(validEmail);
    cy.get(CommonElements.submitButton).click();
    cy.get(ProfileElements.footerButton).should('be.enabled');
  });

  it('should verify email and go to next page after click in Continue button', () => {
    cy.get(CommonElements.emailInput).type(validEmail);
    cy.get(CommonElements.submitButton).click();
    cy.get(ProfileElements.footerButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a Phone Number for Your New Profile');
  });
});
