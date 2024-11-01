import BasePage from "./basePage";

class ProductPage extends BasePage {

    constructor() {
        super();
    }

    private get buyBtn() { return cy.get("#product-buy-button"); }
    private get closeProdactModalWindow() { return cy.get(".v-modal__close-btn"); }
    private get currentItemPrice() { return cy.get("[itemtype='http://schema.org/Offer']"); }
    private get totalPrice() { return cy.get("span[class='total-box__price']"); }
    private get firstDeleteProductBth() { return cy.get(".title").first().find("svg"); }
    private get breadCrumb() { return cy.get(".b-crumbs__link"); }
    private get productCartContent() { return cy.get(".product-card__content > a"); }
    private get productTitle() { return cy.get(".product-card__title"); }
    private get productLayoutContainer() { return cy.get(".products-layout__container.products-layout--grid"); }
    private get productPageHeader() { return cy.get(".p-view__header-title"); }
    private productName = "";


    addItemToCart(itemName: string): void {
        cy.contains("a", itemName).click();
        this.currentItemPrice.invoke('text').then(price => 
            this.sumPrice += Number(price.replace(/\D/g, ''))
        );
        this.buyBtn.click();
        this.closeProdactModalWindow.click();
    }

    verifyProductPageHeader(): void {
        this.productPageHeader.invoke('text').then(text => {
            expect(text).to.equal(this.productName);
        })
    }

    clickOnProductNumber(productPosition: number): void {
        this.productCartContent.eq(productPosition).invoke('attr', 'title').then(text => {
            this.productName = text;
        });
        this.productLayoutContainer.find(".product-card").eq(productPosition).click();
    }

    assertSearchedItemsCountIs(productsQuantity: number, product: string): void {
        this.productTitle.should((title) => {
            expect(title.length).to.equal(productsQuantity)
            expect(title.first()).to.contain(product);
        })
    }

    assertProductIsPresentInCart(productName: string): void {
        cy.contains(productName).should("be.visible");
    }

    assertTotalPriceIsCorrect(): void {
        this.totalPrice.invoke('text').then(text => {
            text.replace(/\D/g, '')
        }).then(uiTotalPrice => {
            expect(uiTotalPrice.replace(/\D/g, '')).contains(this.sumPrice)
        });
    }

    assertDeleteBtnIsEnabled(): void {
        this.firstDeleteProductBth.should('be.visible');
    }

    assertBreadCrumbContain(productTitle: string): void {
        this.breadCrumb.invoke('text').should('contain', productTitle);
        //or
        this.breadCrumb.should('have.attr', 'class', 'b-crumbs__link').and('be.visible');
    }

    assertProductIsVisible(productTitle: string): void {
        this.productCartContent.invoke('attr', 'title').should('contain', productTitle);
    }

}

export const productPage = new ProductPage();