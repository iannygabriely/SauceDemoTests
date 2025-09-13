import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
	readonly page: Page;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly postalCodeInput: Locator;
	readonly continueButton: Locator;
	readonly finishButton: Locator;
	readonly totalPrice: Locator;
	readonly successMessage: Locator;
	readonly backToHomeButton: Locator;
	readonly subtotalLabel: Locator;
	readonly taxLabel: Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstNameInput = page.locator('[data-test="firstName"]');
		this.lastNameInput = page.locator('[data-test="lastName"]');
		this.postalCodeInput = page.locator('[data-test="postalCode"]');
		this.continueButton = page.locator('[data-test="continue"]');
		this.finishButton = page.locator('[data-test="finish"]');
		this.totalPrice = page.locator('.summary_total_label');
		this.successMessage = page.locator('.complete-header');
		this.backToHomeButton = page.locator('[data-test="back-to-products"]');
		this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
		this.taxLabel = page.locator('[data-test="tax-label"]');
	}

	async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.postalCodeInput.fill(postalCode);
		await this.continueButton.click();
	}

	async getSubtotal(): Promise<number> {
		const subtotalText = await this.subtotalLabel.textContent();
		return parseFloat(subtotalText!.replace('Item total: $', ''));
	}

	async getTax(): Promise<number> {
		const taxText = await this.taxLabel.textContent();
		return parseFloat(taxText!.replace('Tax: $', ''));
	}

	async getTotalPrice(): Promise<number> {
		const totalText = await this.totalPrice.textContent();
		return parseFloat(totalText!.replace('Total: $', ''));
	}

	async finishCheckout(): Promise<void> {
		await this.finishButton.click();
	}

	async validateSuccessMessage(): Promise<string> {
		const message = await this.successMessage.textContent();
		return message ? message : "";
	}

	async backToHome(): Promise<void> {
		await this.backToHomeButton.click();
	}
}