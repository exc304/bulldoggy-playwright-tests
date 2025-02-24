import { test, expect } from '@playwright/test';

/*
Feature: User Authentication
Scenario: Successful login and logout
Given I am on the login page
When I enter valid credentials
And I click the login button
Then I should see my dashboard
And I should be able to logout successfully
*/

test('User should be able to log in and log out successfully', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000');
  await page.fill('input[name="username"]', 'pythonista');
  await page.fill('input[name="password"]', 'I<3testing');
  await page.click('button:has-text("Login")');
  await expect(page.locator('text=Dashboard')).toBeVisible();
  await page.click('button:has-text("Logout")');
  await expect(page.locator('text=Successfully logged out')).toBeVisible();
});
