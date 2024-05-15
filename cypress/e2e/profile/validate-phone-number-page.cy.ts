/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { ResetPasswordCodeValidationElements } from 'cypress/support/elements/login/ResetPasswordCodeValidationElements';
import { ProfileElements } from 'cypress/support/elements/profile/ProfileElements';
const url = Cypress.config('baseUrl') || '';

describe('profile page, vlidate phone number', () => {
  beforeEach(() => {
    window.localStorage.setItem('#TOKEN', '123456');
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-profile/phone-number-validation`);
  });

  it('should have to load the page', () => {
    cy.get(CommonElements.h2Title).should('have.text', 'Validate Phone Number for Your New Profile');
  });

  it('should send a token and return an error', () => {
    cy.get(ResetPasswordCodeValidationElements.input1).type('0');
    cy.get(ResetPasswordCodeValidationElements.input2).type('0');
    cy.get(ResetPasswordCodeValidationElements.input3).type('0');
    cy.get(ResetPasswordCodeValidationElements.input5).type('0');
    cy.get(ResetPasswordCodeValidationElements.input6).type('0');
    cy.get(ResetPasswordCodeValidationElements.input7).type('0');
    cy.get(CommonElements.submitButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Invalid code ');
  });

  it('should send a token and enable continue button', () => {
    cy.get(ResetPasswordCodeValidationElements.input1).type('1');
    cy.get(ResetPasswordCodeValidationElements.input2).type('1');
    cy.get(ResetPasswordCodeValidationElements.input3).type('1');
    cy.get(ResetPasswordCodeValidationElements.input5).type('1');
    cy.get(ResetPasswordCodeValidationElements.input6).type('1');
    cy.get(ResetPasswordCodeValidationElements.input7).type('1');
    cy.get(CommonElements.submitButton).click();
    cy.get(ProfileElements.continueButton).should('be.enabled');
  });

  it('should validate token and go to next page', () => {
    cy.get(ResetPasswordCodeValidationElements.input1).type('1');
    cy.get(ResetPasswordCodeValidationElements.input2).type('1');
    cy.get(ResetPasswordCodeValidationElements.input3).type('1');
    cy.get(ResetPasswordCodeValidationElements.input5).type('1');
    cy.get(ResetPasswordCodeValidationElements.input6).type('1');
    cy.get(ResetPasswordCodeValidationElements.input7).type('1');
    cy.get(CommonElements.submitButton).click();
    cy.get(ProfileElements.continueButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a theme');
  });

  it('should go to previous page', () => {
    cy.get(ProfileElements.backButton).click();
    cy.get(CommonElements.h2Title).should('have.text', 'Choose a Phone Number for Your New Profile');
  });
});
