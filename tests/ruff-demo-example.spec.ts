import {test, expect, type Locator, type Page} from '@playwright/test';

// no longer hard coded log in for pythonista user
let myUser = {
    "username": "pythonista",
    "password": "I<3testing"
}

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

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

test('Pythonista should be able to log in and log out successfully', async ({page}) => {
  
  // Given: The login page is displayed
  await expect(page).toHaveTitle('Login | Bulldoggy reminders app');

  // When: Pythonista logs in with valid credentials
  login(page, myUser);

  // Then: The reminders page displays with title card "Reminders for pythonista"
  await expect(page).toHaveTitle('Reminders | Bulldoggy reminders app');
  await expect(page).toHaveURL('/reminders');
  await expect(page.locator('id=bulldoggy-logo')).toBeVisible();
  await expect(page.locator('id=bulldoggy-title')).toBeVisible();
  await expect(page.locator('id=reminders-message')).toHaveText('Reminders for pythonista');

  // And: The user can log out
  await page.getByRole('button', {name: 'Logout'}).click();

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

test('User should be able to create, edit, and delete a reminder list', async ({page}) => {
  
  // Given: The user is logged in
  login(page, myUser);
  
  // When: The user creates a new list
  createList(page, `Shopping List`);
  await expect(page.locator('p', { hasText: 'Shopping List' })).toBeVisible();
  
  // And: The user edits the list name
  const shoppingListRow = page.locator('text="Shopping List"').locator('..'); // Get its parent row
  await shoppingListRow.locator('img[src="/static/img/icons/icon-edit.svg"]').click();
  await page.fill('input[name="new_name"]', 'JUST PICKLES');
  await page.click('img[src="/static/img/icons/icon-check-circle.svg"]');
  //await shoppingListRow.locator('img[src="/static/img/icons/icon-check-circle.svg"]').click();
  await expect(page.locator('p', { hasText: 'JUST PICKLES' })).toBeVisible();  
  // Then: The user deletes the list
  const justPicklesRow = page.locator('text="JUST PICKLES"').locator('..');
  await justPicklesRow.locator('img[src="/static/img/icons/icon-delete.svg"]').click();
  await expect(page.locator('p', { hasText: 'JUST PICKLES' })).not.toBeVisible();
});

/*
Feature: Reminder List Items Management
Scenario: Add, edit, and delete items in a list
Given I am logged into Bulldoggy
And I have a new or existing reminder list
Then I should be able to manipulate the items in the list
And the updates should reflect in the list
*/

test('User should be able to add, edit, complete, and delete reminder list items', async ({page}) => {
  
  // Given: The user is logged in
  login(page, myUser);

  // Create a new reminder list
  await page.getByText('New list').click();
  await page.fill('input[name="listName"]', 'List Management Tests');
  await expect(page.locator('text=List Management Tests')).toBeVisible();

  // Add a reminder item
  await page.getByText('List Management Tests').click();
  await page.getByText('New reminder').click();
  await page.fill('input[name="newReminderItemName"]', 'Buy a lot of milk');
  await expect(page.locator('text=Buy a lot of milk')).toBeVisible();

  // Edit reminder item
  await page.getByText('Buy a lot of milk').click();
  await page.fill('input[name="reminderText"]', 'Buy oat milk');
  await expect(page.locator('text=Buy oat milk')).toBeVisible();

  // Mark reminder as completed
  await page.getByText('Buy oat milk').click();
  await expect(page.locator('text=Buy oat milk')).toHaveClass(/completed/);

  // Delete reminder item
  const buyOatMilkItem = page.locator('text="Buy oat milk"').locator('..');
  await buyOatMilkItem.locator('img[src="/static/img/icons/icon-delete.svg"]').click();
  await expect(page.locator('text=Buy oat milk')).not.toBeVisible();
});

/*
Feature: Data Persistence After Logout/Login
Scenario: Validate that lists and reminders persist after logging out and back in
Given I am logged in as a regular user
When I am viewing my dashboard
Then I can see lists and reminders that I expect to be there
And not lists or reminders that I do not
*/

test('Reminder lists and items should persist after logging out and back in', async ({page}) => {
  
  // Given: The user is logged in
  login(page, myUser);

  // Create a new list
  await page.click('button:has-text("New list")');
  await page.fill('input[name="listName"]', 'Totally NOT Groceries');
  await page.click('button:has-text("Save")');

  // Add an item to the list
  await page.fill('input[name="newReminder"]', 'mini resin ducks');
  await page.click('button:has-text("Add")');
  await expect(page.locator('text=mini resin ducks')).toBeVisible();

  // Log out and back in
  await page.click('button:has-text("Logout")');
  login(page, myUser);

  // Validate persistence
  await expect(page.locator('text=Totally NOT Groceries')).toBeVisible();
  await expect(page.locator('text=mini resin ducks')).toBeVisible();
});

/*
Feature: Basic Accessibility Checks
Scenario: Check for missing ARIA landmarks, language attributes, tabbing issues, and contrast errors
*/

test('Accessibility audit for reminder page', async ({page}) => {
  
  // Given: The user is logged in
  login(page, myUser);

  // Check for ARIA attributes
  await expect(page.locator('[role="main"]')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Your reminders');

  // Ensure elements are keyboard accessible
  await page.keyboard.press('Tab');
  await expect(page.locator('button:has-text("New list")')).toBeFocused();

  // Check color contrast issues using Lighthouse or Axe
  // (This part can be executed separately with Lighthouse CLI)
});

async function login(page: Page, myUser: { username: string; password: string; }) {
  await page.fill('input[name="username"]', myUser.username);
  await page.fill('input[name="password"]', myUser.password);
  await page.click('button:has-text("Login")');
}

async function createList(page: Page, listName: string) {
  await page.click('[data-id="new-reminder-row"]');
  await page.fill('input[name="reminder_list_name"]', listName);
  await page.click('img[src="/static/img/icons/icon-check-circle.svg"]');
}
