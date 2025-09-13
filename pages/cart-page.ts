import { Page, Locator } from "@playwright/test";

export class CartPage {
	readonly page: Page;
	readonly cartItems: Locator;
	readonly cartItemNames: Locator;
	readonly cartItemPrices: Locator;
	readonly checkoutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.cartItems = page.locator(".cart_item");
		this.cartItemNames = page.locator(".inventory_item_name");
		this.cartItemPrices = page.locator(".inventory_item_price");
		this.checkoutButton = page.locator('[data-test="checkout"]');
	}

	async getCartItemNames(): Promise<string[]> {
		const names = await this.cartItemNames.allTextContents();
		return names.map(name => name.trim());
	}

	async getCartItemPrices(): Promise<number[]> {
		const prices = await this.cartItemPrices.allTextContents();
		return prices.map(p => parseFloat(p.replace("$", "")));
	}

	async getCartItemCount(): Promise<number> {
		return await this.cartItems.count();
	}

	async goToCheckout() {
		await this.checkoutButton.click();
	}

	async removeProductsFromCart(productNames: string[]): Promise<void> {
		for (const productName of productNames) {
			const removeButton = this.page.locator(`.cart_item:has-text("${productName}") button[id^="remove"]`);
			await removeButton.click();
		}
	}
}
