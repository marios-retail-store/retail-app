import React from 'react';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import CustomDropdown from './CustomDropdown.jsx';

describe('Custom Dropdown', () => {
  it('should display placeholder on the selector', async () => {
    render(<CustomDropdown
      placeholder="placeholder_test"
      options={['option1', 'option2']}
      width="100px"
      height={20}
    />);

    const selector = screen.getByText('placeholder_test');
    expect(selector).toBeInTheDocument();
  });

  it('should display options when clicking on the selector', async () => {
    render(<CustomDropdown
      placeholder="placeholder_test"
      options={['option1', 'option2']}
      width="100px"
      height={20}
    />);

    const tryForOption = () => screen.getByText('option1');
    expect(tryForOption).toThrow();
    const selector = screen.getByText('placeholder_test');
    fireEvent(
      selector,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const option = tryForOption();
    expect(option).toBeInTheDocument();
  });

  it('clicking a disabled dropdown shold not display options', async () => {
    render(<CustomDropdown
      placeholder="placeholder_test"
      options={['option1', 'option2']}
      width="100px"
      height={20}
      disabled
    />);

    const tryForOption = () => screen.getByText('option1');
    expect(tryForOption).toThrow();
    const selector = screen.getByText('placeholder_test');
    fireEvent(
      selector,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(tryForOption).toThrow();
  });

  it('should close the dropdown when clicking an option and change the selector text to reflect the selected option', async () => {
    render(<CustomDropdown
      placeholder="placeholder_test"
      options={['option1', 'option2']}
      width="100px"
      height={20}
    />);

    let selector = screen.getByText('placeholder_test');
    fireEvent(
      selector,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const option = screen.getByText('option1');
    fireEvent(
      option,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    const tryForOldSelectorName = () => screen.getByText('placeholder_test');
    const tryForOption2 = () => screen.getByText('option2');
    expect(tryForOldSelectorName).toThrow();
    expect(tryForOption2).toThrow();
    selector = screen.getByText('option1');
    expect(selector).toBeInTheDocument();
  });
});

// ================================================
// Old tests using puppeteer
// ================================================

/**
 * @jest-environment puppeteer
 */
/* eslint-disable no-undef */

// dependencies automatically added with environment

// describe('Custom Dropdown', () => {
//   beforeEach(async () => {
//     await page.goto('http://localhost:3000/');
//   });

//   it('should display options when clicking on a selector', async () => {
//     let option = await page.$('.custom-dropdown-option');
//     expect(option).toBe(null);
//     await page.click('.custom-dropdown-selector');
//     option = await page.$('.custom-dropdown-option');
//     expect(option).not.toBe(null);
//   });

//   it('should close the dropdown when clicking an option', async () => {
//     await page.click('.custom-dropdown-selector');
//     await page.click('.custom-dropdown-option');
//     const option = await page.$('.custom-dropdown-option');
//     expect(option).toBe(null);
//   });

//   it('should change the selector\'s placeholder text to the selected option', async () => {
//     await page.click('.custom-dropdown-selector');
//     const option = await page.$('.custom-dropdown-option');
//     const optionText = await option.evaluate((element) => element.textContent);
//     await option.click();
//     const selector = await page.$('.custom-dropdown-selector');
//     const children = await selector.$$('*');
//     const newPlaceholderText = await children[0].evaluate((element) => element.textContent);
//     expect(newPlaceholderText).toBe(optionText);
//   });
// });
