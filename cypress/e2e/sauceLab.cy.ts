describe("Test session storage", () => {
    beforeEach(() => {
        //cy.sauceLogin("standard_user", "secret_sauce");
    })
    it("Login", () => {
        cy.sauceLogin("standard_user", "secret_sauce");
    })

    it("Test for CI", () => {
        cy.sauceLogin("standard_user", "secret_sauce");
    })
})