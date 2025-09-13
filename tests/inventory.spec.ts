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
		const sortedByAscPrice = [...prices].sort((a, b) => a - b);

		expect(prices).toEqual(sortedByAscPrice);
	});

	test("Deve exibir produtos em ordem decrescente de preço", async ({ page }) => {
		const inventory = new InventoryPage(page);

		await inventory.sortBy("hilo");
		const productPrices = await inventory.getPrices();
		const sortedByDescPrice = [...productPrices].sort((a, b) => b - a);

		expect(productPrices).toEqual(sortedByDescPrice);
	});

	test("Deve exibir produtos em ordem alfabética A-Z", async ({ page }) => {
		const inventory = new InventoryPage(page);

		await inventory.sortBy("az");
		const productNames = await inventory.getProductNames();
		const sortedByNameAsc = [...productNames].sort((a, b) => a.localeCompare(b));

		expect(productNames).toEqual(sortedByNameAsc);
	});

	test("Deve exibir produtos em ordem alfabética Z-A", async ({ page }) => {
		const inventory = new InventoryPage(page);

		await inventory.sortBy("za");
		const productNames = await inventory.getProductNames();
		const sortedByNameDesc = [...productNames].sort((a, b) => b.localeCompare(a));

		expect(productNames).toEqual(sortedByNameDesc);
	});

});
