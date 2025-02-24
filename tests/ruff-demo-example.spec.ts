import { test, expect } from '@playwright/test';

/*
Feature: User Authentication
Scenario: Successful login and logout
Given I am on the login page
When I enter valid credentials
And I click the login button
Then I should see my reminders dashboard
And I should be able to logout successfully
*/

test('User should be able to log in and log out successfully', async ({ page }) => {
  // Given: The login page is displayed
  await page.goto('http://127.0.0.1:8000');
  await expect(page).toHaveTitle('Login | Bulldoggy reminders app');

  // When: The user logs in with valid credentials
  await page.fill('input[name="username"]', 'pythonista'); // Hardcoded for now
  await page.fill('input[name="password"]', 'I<3testing'); // Hardcoded for now
  await page.click('button:has-text("Login")');

  // Then: The reminders page displays with title card "Reminders for pythonista"
  await expect(page.locator('#bulldoggy-logo')).toBeVisible();
  await expect(page.locator('#reminders-message')).toHaveText('Reminders for pythonista');

  // Log out
  await page.click('button:has-text("Logout")');

  // Verify logout success
  await expect(page.locator('text=Successfully logged out')).toBeVisible();
});
