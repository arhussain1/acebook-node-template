describe("Timeline", () => {
  beforeEach(() => {
    cy.task('clearposts')
  })

  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.signUp();

    // sign in
    cy.signIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    // submit another post and see the most recent post first
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, again!");
    cy.get("#new-post-form").submit();
    cy.get(".post").first().should("contain", "Hello, again!");
  });
});
