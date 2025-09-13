import { Page } from "@playwright/test";

export class InventoryPage {
	readonly page: Page;
	readonly sortDropdown;
	readonly productPrices;
	readonly productNames;

	constructor(page: Page) {
		this.page = page;
		this.sortDropdown = page.locator('[data-test="product-sort-container"]');
		this.productPrices = page.locator(".inventory_item_price");
		this.productNames = page.locator(".inventory_item_name");

	}

	async sortBy(option: string) {
		await this.sortDropdown.selectOption(option);
	}

	async getPrices(): Promise<number[]> {
		const prices = await this.productPrices.allTextContents();
		return prices.map(p => parseFloat(p.replace("$", "")));
	}

	async getProductNames(): Promise<string[]> {
		const names = await this.productNames.allTextContents();
		return names.map(name => name.trim());
	}

	async addProductsToCart(productNames: string[]): Promise<{ titles: string[], prices: number[] }> {
		const titles: string[] = [];
		const prices: number[] = [];

		for (const productName of productNames) {
			const titleText = await this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_name`).textContent();
			titles.push(titleText!.trim());

			const priceText = await this.page.locator(`.inventory_item:has-text("${productName}") .inventory_item_price`).textContent();
			prices.push(parseFloat(priceText!.replace("$", "")));

			const addButton = this.page.locator(`.inventory_item:has-text("${productName}") button[id^="add-to-cart"]`);
			await addButton.click();
		}

		return { titles, prices };
	}
}
