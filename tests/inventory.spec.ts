import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { ConfigurationReader } from "../utils/configuration-reader";

test.describe("Ordenação de Produtos", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(ConfigurationReader().user, ConfigurationReader().password);
  });

  test("Deve exibir produtos em ordem crescente de preço", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortBy("lohi"); 
    const prices = await inventory.getPrices();

    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});
