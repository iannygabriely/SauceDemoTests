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
}
