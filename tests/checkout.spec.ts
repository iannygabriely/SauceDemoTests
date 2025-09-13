import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { CartPage } from "../pages/cart-page";
import { CheckoutPage } from "../pages/checkout-page";
import { ConfigurationReader } from "../utils/configuration-reader";

test.describe("Checkout", () => {
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;
  let productsToAdd: string[];

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(ConfigurationReader().user, ConfigurationReader().password);

    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    productsToAdd = ConfigurationReader().productsToAdd;
  });

  test("Realizar checkout validando valores dos produtos e carrinho sendo zerado", async ({ page }) => {
    const { prices: expectedPrices } = await inventory.addProductsToCart(productsToAdd);

    await inventory.page.locator(".shopping_cart_link").click();

    await cart.goToCheckout();
    await checkout.fillCheckoutForm("Jõao", "Oliveira", "12345");

    const subtotal = await checkout.getSubtotal();
    const tax = await checkout.getTax();
    const totalPrice = await checkout.getTotalPrice();

    expect(totalPrice).toBeCloseTo(subtotal + tax, 2);

    await checkout.finishCheckout();

    const successMessage = await checkout.validateSuccessMessage();
    expect(successMessage).toBe("Thank you for your order!");

    await checkout.backToHome();

    await inventory.page.locator(".shopping_cart_link").click();
    const itemCount = await cart.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test("Erro ao tentar checkout sem informar o primeiro nome", async ({ page }) => {
    await inventory.addProductsToCart(productsToAdd);

    await inventory.page.locator(".shopping_cart_link").click();

    await cart.goToCheckout();
    await checkout.fillCheckoutForm("", "Oliveira", "12345");

    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe("Error: First Name is required");
  });

  test("Erro ao tentar checkout sem informar o sobrenome", async ({ page }) => {
    await inventory.addProductsToCart(productsToAdd);

    await inventory.page.locator(".shopping_cart_link").click();

    await cart.goToCheckout();
    await checkout.fillCheckoutForm("Jõao", "", "12345");

    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe("Error: Last Name is required");
  });

  test("Erro ao tentar checkout sem informar o código postal", async ({ page }) => {
    await inventory.addProductsToCart(productsToAdd);

    await inventory.page.locator(".shopping_cart_link").click();

    await cart.goToCheckout();
    await checkout.fillCheckoutForm("João", "Oliveira", "");

    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBe("Error: Postal Code is required");
  });
});