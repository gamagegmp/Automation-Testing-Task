/// <reference types='cypress'/>

describe("Web Tables Page Test", () => {
  it("should navigate to the page", () => {
    cy.visit("https://demoqa.com/elements");

    cy.contains("Web Tables").click();
    cy.url().should("include", "/webtables");
  });
});

describe("Registration Form Tests", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/webtables");
  });

  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  it("should display registration form", () => {
    cy.get("#addNewRecordButton").should("be.visible").click();
    cy.get("#registration-form-modal").should("be.visible");
  });

  it("should display all form fields and should be editable", () => {
    cy.get("#addNewRecordButton").click();

    cy.get("#firstName")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.firstName);
    cy.get("#lastName")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.lastName);
    cy.get("#userEmail")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.email);
    cy.get("#age")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.age);
    cy.get("#salary")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.salary);
    cy.get("#department")
      .should("be.visible")
      .should("be.enabled")
      .type(testData.userData.valid.department);
  });

  it("should not accept null values for required fields", () => {
    cy.get("#addNewRecordButton").should("be.visible").click();

    cy.get("#submit").click();
    cy.get("#registration-form-modal").should("be.visible");
  });

  it("should not accept invalid data", () => {
    cy.get("#addNewRecordButton").click();

    //input invalid email
    cy.get("#firstName").type(testData.userData.valid.firstName);
    cy.get("#lastName").type(testData.userData.valid.lastName);
    cy.get("#userEmail").type(testData.userData.invalid.email);
    cy.get("#age").type(testData.userData.valid.age);
    cy.get("#salary").type(testData.userData.valid.salary);
    cy.get("#department").type(testData.userData.valid.department);

    cy.get("#submit").click();
    cy.get("#registration-form-modal").should("be.visible");

    //input invalid age
    cy.get("#userEmail").clear().type(testData.userData.valid.email);
    cy.get("#age").clear().type(testData.userData.invalid.age);

    cy.get("#submit").click();
    cy.get("#registration-form-modal").should("be.visible");

    //input invalid salary
    cy.get("#age").clear().type(testData.userData.valid.age);
    cy.get("#salary").clear().type(testData.userData.invalid.salary);

    cy.get("#submit").click();
    cy.get("#registration-form-modal").should("be.visible");
  });

  it("should accept and record data after successful submission", () => {
    cy.get("#addNewRecordButton").click();

    cy.get("#firstName").type(testData.userData.valid.firstName);
    cy.get("#lastName").type(testData.userData.valid.lastName);
    cy.get("#userEmail").type(testData.userData.valid.email);
    cy.get("#age").type(testData.userData.valid.age);
    cy.get("#salary").type(testData.userData.valid.salary);
    cy.get("#department").type(testData.userData.valid.department);

    cy.get("#submit").click();
    cy.get("#registration-form-modal").should("not.exist");

    cy.contains(testData.userData.valid.firstName);
    cy.contains(testData.userData.valid.lastName);
    cy.contains(testData.userData.valid.email);
    cy.contains(testData.userData.valid.age);
    cy.contains(testData.userData.valid.salary);
    cy.contains(testData.userData.valid.department);
  });
});

describe("Actions Test", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/webtables");
  });

  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  it("should populate data on edit", () => {
    cy.get("#edit-record-3").click();
    cy.get("#registration-form-modal").should("be.visible");

    cy.get("#firstName").should(
      "have.value",
      testData.userData.initial.firstName
    );
    cy.get("#lastName").should(
      "have.value",
      testData.userData.initial.lastName
    );
    cy.get("#userEmail").should("have.value", testData.userData.initial.email);
    cy.get("#age").should("have.value", testData.userData.initial.age);
    cy.get("#salary").should("have.value", testData.userData.initial.salary);
    cy.get("#department").should(
      "have.value",
      testData.userData.initial.department
    );
  });

  it("should delete data on delete", () => {
    cy.get("#delete-record-3").click();

    cy.get(".ReactTable").should(
      "not.contain",
      testData.userData.initial.email
    );
  });
});
