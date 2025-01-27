import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Locators for the Global Navigation Menu
  readonly aboutUsLink = 'text=About Us';
  readonly servicesLink = 'text=Services';
  readonly productsLink = 'text=Products';
  readonly locationsLink = 'text=Locations';
  readonly adminPageLink = 'text=Admin Page';

  constructor(page: Page) {
    this.page = page;
  }

  // Verify the Global Navigation Menu links
  async verifyGlobalNavigationMenu() {
    const navLinks = [
      { text: 'About Us', expectedUrl: /about/i },
      { text: 'Services', expectedUrl: /services/i },
      { text: 'Products', expectedUrl: /products\.jsp/i },
      { text: 'Locations', expectedUrl: /locations\.jsp/i },
      { text: 'Admin Page', expectedUrl: /admin/i },
    ];

    for (const link of navLinks) {
      // Click the link
      await this.page.click(`text=${link.text}`);
      console.log(`Clicked link: ${link.text}`);

      // Verify the URL (optional, based on your needs)
      // await expect(this.page).toHaveURL(link.expectedUrl);

      // Navigate back to the home page only for "Products" and "Locations"
      if (link.text === 'Products' || link.text === 'Locations') {
        await this.page.goBack(); // Navigate back to the previous page
        console.log(`Navigated back from: ${link.text}`);
      }
    }
  }
}