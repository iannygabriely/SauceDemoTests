import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { CartPage } from "../pages/cart-page";
import { ConfigurationReader } from "../utils/configuration-reader";

test.describe("Validação de Produtos no Carrinho", () => {
    let inventory: InventoryPage;
    let cart: CartPage;
    let productsToAdd: string[];

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(ConfigurationReader().user, ConfigurationReader().password);

        inventory = new InventoryPage(page);
        cart = new CartPage(page);

        productsToAdd = ConfigurationReader().productsToAdd;
    });

    test("Adicionar produtos ao carrinho e validar nomes e valores", async ({ page }) => {
        const expectedTitles: string[] = [];
        const expectedPrices: number[] = [];

        for (const productName of productsToAdd) {
            const titleText = await inventory.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_name`).textContent();
            expectedTitles.push(titleText!.trim());

            const priceText = await inventory.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`).textContent();
            expectedPrices.push(parseFloat(priceText!.replace("$", "")));

            const addButton = inventory.page.locator(`.inventory_item:has-text("${productName}") button[id^="add-to-cart"]`);
            await addButton.click();
        }

        await inventory.page.locator(".shopping_cart_link").click();

        const itemCount = await cart.getCartItemCount();
        expect(itemCount).toBe(productsToAdd.length);

        const cartTitles = await cart.getCartItemNames();
        expect(cartTitles).toEqual(expectedTitles);

        const cartPrices = await cart.getCartItemPrices();
        expect(cartPrices).toEqual(expectedPrices);
    });
});