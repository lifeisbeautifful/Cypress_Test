import { defineConfig } from "cypress";

export default defineConfig({
  setupNodeEvents(on, config) {
    return require('./cypress/plugins/index.js')(on, config)
  },
  e2e: {
    baseUrl: "https://allo.ua",
    viewportHeight: 816,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      homeUrl: "https://allo.ua",
      sauceLogin: "https://www.saucedemo.com/"
    }
  },
});
