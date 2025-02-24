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
  // Given: The login page is displayed
  await page.goto('http://127.0.0.1:8000');

  // When: The user logs in with valid credentials
  await page.fill('input[name="username"]', 'pythonista'); // Hardcoded for now
  await page.fill('input[name="password"]', 'I<3testing'); // Hardcoded for now
  await page.click('button:has-text("Login")');
  
  // When: The user logs in with valid credentials  
  await page.click('button:has-text("Logout")');
  await expect(page.locator('text=Successfully logged out')).toBeVisible();

  // Then: The reminders page is displayed
  await expect(page).toHaveTitle('Bulldoggy reminders app');
  await expect(page).toHaveURL(/\/reminders$/);
  await expect(page.locator('#bulldoggy-logo')).toBeVisible();
  await expect(page.locator('#bulldoggy-title')).toHaveText('Bulldoggy');
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  // And: The reminders page title card displays "Reminders for pythonista"
  await expect(page.locator('#reminders-message')).toHaveText('Reminders for pythonista');

  // Log out
  await page.getByRole('button', { name: 'Logout' }).click();

  // Verify logout success
  await expect(page.locator('text=Successfully logged out')).toBeVisible();
});
