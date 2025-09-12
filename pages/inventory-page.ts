import { Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown;
  readonly productPrices;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator(".inventory_item_price");
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option); 
  }

  async getPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace("$", "")));
  }
}
