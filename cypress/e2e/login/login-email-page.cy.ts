/// <reference types="cypress" />

import { CommonElements } from 'cypress/support/elements/CommonElements';
import { LoginEmailElements } from 'cypress/support/elements/login/LoginEmailElements';
import { LoginPasswordElements } from 'cypress/support/elements/login/LoginPasswordElements';

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';
const invalidEmail = 'error@mail.com';
const validPassword = 'abcd1234';

describe('login page, set email', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/login`);
  });

  it('should have to load the login page', () => {
    cy.get(CommonElements.h3Title).should('have.text', 'Welcome!');
  });

  it('should put a valid email and enable next button', () => {
    cy.get(CommonElements.emailInput).type(validEmail);
    cy.get(LoginEmailElements.nextButton).should('be.enabled');
  });

  it('should put an invalid email and keep next button disabled', () => {
    cy.get(CommonElements.emailInput).type('email');
    cy.get(LoginEmailElements.nextButton).should('be.disabled');
  });

  it('should click on signup button and load signup page', () => {
    cy.get(LoginEmailElements.signupButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Sign up Millez');
  });

  it('should put a valid email, click in next button and load password screen', () => {
    cy.get(CommonElements.emailInput).type(validEmail);
    cy.get(LoginEmailElements.nextButton).click();
    cy.get(LoginPasswordElements.returnButton).should('have.text', ` ${validEmail} `);
  });

  it('should login in the application', () => {
    cy.get(CommonElements.emailInput).type(validEmail);
    cy.get(LoginEmailElements.nextButton).click();
    cy.get(LoginPasswordElements.passwordInput).type(validPassword);
    cy.get(LoginPasswordElements.loginButton).click();
    cy.get(CommonElements.h1Title).should('have.text', 'dashboard works!')
  });

  it('should try to login in the application and recieve an error', () => {
    cy.get(CommonElements.emailInput).type(invalidEmail);
    cy.get(LoginEmailElements.nextButton).click();
    cy.get(LoginPasswordElements.passwordInput).type(validPassword);
    cy.get(LoginPasswordElements.loginButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Invalid user or pass ');
  });
});
