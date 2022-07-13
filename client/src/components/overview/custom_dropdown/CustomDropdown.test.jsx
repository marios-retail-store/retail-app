/**
 * @jest-environment puppeteer
 */
/* eslint-disable no-undef */

// dependencies automatically added with environment

describe('Custom Dropdown', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should display options when clicking on a selector', async () => {
    let option = await page.$('.custom-dropdown-option');
    expect(option).toBe(null);
    await page.click('.custom-dropdown-selector');
    option = await page.$('.custom-dropdown-option');
    expect(option).not.toBe(null);
  });

  it('should close the dropdown when clicking an option', async () => {
    await page.click('.custom-dropdown-selector');
    await page.click('.custom-dropdown-option');
    const option = await page.$('.custom-dropdown-option');
    expect(option).toBe(null);
  });

  it('should change the selector\'s placeholder text to the selected option', async () => {
    await page.click('.custom-dropdown-selector');
    const option = await page.$('.custom-dropdown-option');
    const optionText = await option.evaluate((element) => element.textContent);
    await option.click();
    const selector = await page.$('.custom-dropdown-selector');
    const children = await selector.$$('*');
    const newPlaceholderText = await children[0].evaluate((element) => element.textContent);
    expect(newPlaceholderText).toBe(optionText);
  });
});
