import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ConfigurationReader } from "../utils/configuration-reader";

test.describe("Login - Sauce Demo", () => {
	test("Login com credenciais válidas", async ({ page }) => {
		const loginPage = new LoginPage(page);
		const username = ConfigurationReader().user;
		const password = ConfigurationReader().password;

		await loginPage.goto();
		await loginPage.login(username, password);

		await expect(page).toHaveURL(/.*inventory.html/);
		await expect(page.locator(".title")).toHaveText("Products");
	});

	test(" Login com credenciais inválidas", async ({ page }) => {
		const loginPage = new LoginPage(page);

		await loginPage.goto();
		await loginPage.login("invalid_user", "wrong_password");

		await expect(loginPage.errorMessage).toBeVisible();
		await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
	});
});
