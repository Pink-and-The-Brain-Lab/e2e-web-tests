/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';

const url = Cypress.config('baseUrl') || '';
const validPhoneNumber = '99999999990';
const invalidPhoneNumber = '99999999999';

describe('profile page, choose phone number', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/choose-phone-number`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a Phone Number for Your New Profile');
  });

  it('should set a phone number and recieve invalid phone number', () => {
    cy.get(ProfileElements.cellphoneCode).click();
    cy.get(ProfileElements.countryOption).click();
    cy.get(ProfileElements.cellphoneNumber).type(invalidPhoneNumber);
    cy.get(CommonElements.formButtonSubmit).click();
    cy.get(CommonElements.toastr).should('have.text', ' Cellphone number unavailable ');
  });

  it('should set a phone number and recieve valid phone number', () => {
    cy.get(ProfileElements.cellphoneCode).click();
    cy.get(ProfileElements.countryOption).click();
    cy.get(ProfileElements.cellphoneNumber).type(validPhoneNumber);
    cy.get(CommonElements.formButtonSubmit).click();
    cy.get(ProfileElements.continueButton).should('be.enabled');
  });

  it('should check phone number disponibility and go to next page', () => {
    cy.get(ProfileElements.cellphoneCode).click();
    cy.get(ProfileElements.countryOption).click();
    cy.get(ProfileElements.cellphoneNumber).type(validPhoneNumber);
    cy.get(CommonElements.formButtonSubmit).click();
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Validate Phone Number for Your New Profile');
  });

  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Choose an Email for Your New Profile');
  });
});
