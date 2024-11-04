import { homePage } from "../pages/homePage";
import { catalog } from "../pages/components/catalog";
import { productPage } from "../pages/productPage";

describe('Allo cypress tests', () => {
  it.skip('Add products to cart', () => {
    cy.goToHomePage();
    homePage.clickCatalogBtn();
    catalog.selectCatalogSubItem("Побутова техніка", "Роботи-пилососи");
    homePage.assertIsNavigatedTo("https://allo.ua/ua/roboty-pylesosy/");
    productPage.addItemToCart("Робот-пилосос Xiaomi Robot Vacuum X10");

    homePage.clickCatalogBtn();
    catalog.selectCatalogSubItem("Смартфони та телефони", "Power Bank");
    productPage.addItemToCart("Джерело безперебійного живлення Andes DC1018P 18W 8800mAh 12V/9V/5V для роутера");

    cy.visit("/");
    homePage.clickCartBtn();
    productPage.assertProductIsPresentInCart("Робот-пилосос Xiaomi Robot Vacuum X10");
    productPage.assertProductIsPresentInCart("Джерело безперебійного живлення Andes DC1018P 18W 8800mAh 12V/9V/5V для роутера")
    productPage.assertTotalPriceIsCorrect();
    productPage.assertDeleteBtnIsEnabled();
  })

  it.skip("Search for product by its full name", () => {
    let productName = 'Xiaomi 14T Pro 12/512GB Titan Black'
    cy.goToHomePage();
    homePage.searchBySubmitBtnFor(productName);
    //or
    //homePage.searchByEnterKeyFor(productName);
    productPage.assertBreadCrumbContain(productName);
    productPage.assertProductIsVisible(productName);
  })

  it.skip("Verify search by brand name", () => {
    let brandName = "Xiaomi"
    cy.goToHomePage();
    homePage.searchByEnterKeyFor(brandName);
    productPage.assertSearchedItemsCountIs(28, brandName);
  })

  it.skip("Verify product link navigation", () => {
    cy.goToHomePage();
    homePage.clickCatalogBtn();
    catalog.selectCatalogSubItem("Побутова техніка", "Роботи-пилососи");
    productPage.clickOnProductNumber(1);
    productPage.verifyProductPageHeader();
  })

  it.skip("Verify sort dropdown changes its value", () => {
    cy.goToHomePage();
    homePage.clickCatalogBtn();
    catalog.selectCatalogSubItem("Побутова техніка", "Роботи-пилососи");
    cy.screenshot("cypress test screenshot");
    cy.fixture("filterOptions").then(function(data) {
      this.data = data;
      homePage.sortBy(data["новинки"]);
    })
   // or
   //cy.readFile("cypress/fixtures/filterOptions.json").its("новинки").should("eq", "новинки");
  })
})