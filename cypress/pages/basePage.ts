class BasePage {
    protected sumPrice = 0;
    constructor() {
       
    }

    private get catalogBtn() { return cy.get("[href='/_nuxt/c0d7740a6a835a60a1c099e96bd7a4fa.svg#i-megamenu-button']"); };
    private get cartBtn() { return cy.get("button[aria-label='Кошик']") };

    clickCatalogBtn() {
        this.catalogBtn.click();
    }

    clickCartBtn() {
        this.cartBtn.click();
    }

    assertIsNavigatedTo(url: string): void {
        cy.url().should('contain', url);
    }
}

export default BasePage;