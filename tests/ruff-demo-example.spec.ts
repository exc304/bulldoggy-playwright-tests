import { test, expect } from '@playwright/test';

/*
Feature: User Authentication
Scenario: Successful login and logout
Given I am on the login page
When I enter valid credentials
And I click the login button
Then I should see my reminders dashboard
And I should see the logout button
Then I click the logout button
Then I am logged out successfully
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

  // And: The user can log out
  await page.click('button:has-text("Logout")');

  // Then: Verify logout success
  await expect(page.locator('text=Successfully logged out')).toBeVisible();
});

/*
Feature: Reminder List Management
Scenario: Create, edit, and delete a reminder list
Given I am logged into Bulldoggy
When I create a new reminder list
Then I should see the list displayed on my dashboard
And I should be able to edit the list name
Then the updated list name should be visible
And I should be able to delete the list
Then it should no longer be visible
*/

test('User should be able to create, edit, and delete a reminder list', async ({ page }) => {
  // Given: The user is logged in
  await page.goto('http://127.0.0.1:8000');
  await page.fill('input[name="username"]', 'pythonista'); // Hardcoded for now
  await page.fill('input[name="password"]', 'I<3testing'); // Hardcoded for now
  await page.click('button:has-text("Login")');
  
  // When: The user creates a new list
  await page.getByText('New List').click();
  await page.fill('input[name="listName"]', 'Shopping List');
  await expect(page.locator('text=Shopping List')).toBeVisible();
  
  // And: The user edits the list name
  const shoppingListRow = page.locator('text="Shopping List"').locator('..'); // Get its parent row
  await shoppingListRow.locator('img[src="/static/img/icons/icon-edit.svg"]').click();
  await page.fill('input[name="listName"]', 'JUST PICKLES');
  await expect(page.locator('text=JUST PICKLES')).toBeVisible();
  
  // Then: The user deletes the list
  const justPicklesRow = page.locator('text="JUST PICKLES"').locator('..');
  await justPicklesRow.locator('img[src="/static/img/icons/icon-delete.svg"]').click();
  await expect(page.locator('text=JUST PICKLES')).not.toBeVisible();
});
