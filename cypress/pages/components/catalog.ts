import BasePage from "../basePage";

class Catalog extends BasePage {
    constructor() {
        super();
    }

    selectCatalogSubItem(item: string, subItem: string): void {
        cy.contains(item).trigger('mouseover');
        cy.contains(subItem).click({ force: true });
    }

}

export const catalog = new Catalog();