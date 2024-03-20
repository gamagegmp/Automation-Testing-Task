/// <reference types='cypress'/>

describe("Text Box Page Test", () => {
  it("should navigate to the page", () => {
    cy.visit("https://demoqa.com/elements");

    cy.contains("Text Box").click();
    cy.url().should("include", "/text-box");
  });
});

describe("Text Box Page Input Fields", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/text-box");
  });

  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  it("should have editable input fields", () => {
    cy.get("#userName")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.textBoxData.valid.name);
    cy.get("#userEmail")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.textBoxData.valid.email);
    cy.get("#currentAddress")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.textBoxData.valid.currentAddress);
    cy.get("#permanentAddress")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.textBoxData.valid.permanentAddress);
  });

  it("should submit valid data successfully", () => {
    cy.get("#userName").type(testData.textBoxData.valid.name);
    cy.get("#userEmail").type(testData.textBoxData.valid.email);
    cy.get("#currentAddress").type(testData.textBoxData.valid.currentAddress);
    cy.get("#permanentAddress").type(
      testData.textBoxData.valid.permanentAddress
    );
    cy.get("#submit").should("be.visible").click();

    // Validate changes after submission
    cy.get("#name").should("have.value", "");
    cy.get("#email").should("have.value", "");
    cy.get(".border > #currentAddress").should("have.value", "");
    cy.get(".border > #permanentAddress").should("have.value", "");
  });

  it("should not submit invalid data", () => {
    cy.get("#userName").type(testData.textBoxData.valid.name);
    cy.get("#userEmail").type(testData.textBoxData.invalid.email);
    cy.get("#currentAddress").type(testData.textBoxData.valid.currentAddress);
    cy.get("#permanentAddress").type(
      testData.textBoxData.valid.permanentAddress
    );
    cy.get("#submit").should("be.visible").click();

    cy.get("#name").should("not.exist");
    cy.get("#email").should("not.exist");
    cy.get(".border > #currentAddress").should("not.exist");
    cy.get(".border > #permanentAddress").should("not.exist");
  });

  it("should display submitted data in output section", () => {
    cy.get("#userName").type(testData.textBoxData.valid.name);
    cy.get("#userEmail").type(testData.textBoxData.valid.email);
    cy.get("#currentAddress").type(testData.textBoxData.valid.currentAddress);
    cy.get("#permanentAddress").type(
      testData.textBoxData.valid.permanentAddress
    );
    cy.get("#submit").should("be.visible").click();

    cy.get("#name").should("contain", testData.textBoxData.valid.name);
    cy.get("#email").should("contain", testData.textBoxData.valid.email);
    cy.get(".border > #currentAddress").should(
      "contain",
      testData.textBoxData.valid.currentAddress
    );
    cy.get(".border > #permanentAddress").should(
      "contain",
      testData.textBoxData.valid.permanentAddress
    );
  });
});
