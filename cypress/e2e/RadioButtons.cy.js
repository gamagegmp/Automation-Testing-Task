/// <reference types='cypress'/>

describe("Radio Button Page Test", () => {
  it("should navigate to the page", () => {
    cy.visit("https://demoqa.com/elements");

    cy.contains("Radio Button").click();
    cy.url().should("include", "/radio-button");
  });
});

describe("Radio Button Tests", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/radio-button");
  });

  it("should display radio buttons", () => {
    cy.get("#yesRadio").should("not.be.checked");
    cy.get("#impressiveRadio").should("not.be.checked");
    cy.get("#noRadio").should("not.be.checked").should("be.disabled");
  });

  it("should display message when 'Yes' option is selected", () => {
    cy.contains("Yes").click();
    cy.get("#impressiveRadio").should("not.be.checked");
    cy.get("#noRadio").should("not.be.checked").should("be.disabled");
    cy.contains("You have selected Yes");
  });

  it("should display message when 'Impressive' option is selected", () => {
    cy.contains("Impressive").click();
    cy.get("#yesRadio").should("not.be.checked");
    cy.get("#noRadio").should("not.be.checked").should("be.disabled");
    cy.contains("You have selected Impressive");
  });
});
