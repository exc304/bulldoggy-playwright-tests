import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // ✅ Set base URL to locally running Bulldoggy app
    baseURL: 'http://127.0.0.1:8000',

    // ✅ Run in headless mode for automation
    headless: true,

    // ✅ Enable tracing for failed tests
    trace: 'on-first-retry',

    // ✅ Screenshots on failure
    screenshot: 'only-on-failure',

    // ✅ Video recording for debugging
    video: 'retain-on-failure'
  },

  // ✅ Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
