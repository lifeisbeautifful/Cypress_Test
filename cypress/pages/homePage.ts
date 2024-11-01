import BasePage from "./basePage";

class HomePage extends BasePage {

    private get searchInput() { return cy.get("#search-form__input"); }
    private get submitBtn() { return cy.get("button[type=submit]").first(); }
    private get sortDropDown() { return cy.get(".sort-by__select"); }
    private sortOption(option: string) { return cy.get(`[title='${option}']`); }

    constructor() {
        super();
    }

    sortBy(option: string): void {
        this.sortDropDown.trigger('mouseover');
        this.sortOption(option).click();
        this.sortDropDown.children().invoke('text').should('contain', option);
    }

    searchBySubmitBtnFor(text: string): void {
        this.searchInput.clear().type(text);
        //gets locator value
        this.searchInput.invoke('val').then(value => {
            expect(value).to.equal(text)
        });
        this.submitBtn.should('be.enabled').click();
    }

    searchByEnterKeyFor(text: string): void {
        this.searchInput.type(text + "{enter}");
        //or
        //cy.type("{enter}");
    }
 
}

export const homePage = new HomePage();

