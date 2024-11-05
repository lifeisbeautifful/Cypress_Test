import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://allo.ua",
    viewportHeight: 816,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin") (on);
      // implement node event listeners here
    },
    env: {
      homeUrl: "https://allo.ua",
      sauceLogin: "https://www.saucedemo.com/"
    }
  },
});
