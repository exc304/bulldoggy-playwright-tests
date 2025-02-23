# Bulldoggy Playwright Tests 🐶🎭

## 📌 Project Overview
This repository contains an end-to-end test suite for **Bulldoggy**, a FastAPI and HTMX-based reminders web app. The tests are implemented using **Playwright with TypeScript** and cover key user interactions, API validation, and accessibility checks.

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone <your-repo-url>
cd bulldoggy-playwright-tests
```

### **2️⃣ Install Dependencies**
Ensure you have **Node.js (>=16)** installed, then run:
```sh
npm install
```

### **3️⃣ Start the Bulldoggy App Locally**
Before running tests, ensure the Bulldoggy web app is running locally:
```sh
cd ../bulldoggy-reminders-app
uvicorn app.main:app --reload
```
The app should now be accessible at **http://127.0.0.1:8000**.

### **4️⃣ Run Playwright Tests**
Navigate back to the test project and execute the tests:
```sh
cd ../bulldoggy-playwright-tests
npx playwright test --parallel
```

## ✅ Automated Test Coverage
This test suite validates the following core functionalities:
1. **User Login & Logout Validation** 🏷️
   - Verify users can log in and out successfully.
   - Validate the "successfully logged out" message.

2. **Create, Edit, and Delete a Reminder List** 📋
   - Ensure a new list can be created, renamed, and deleted.

3. **Add, Edit, Complete, and Delete a Reminder Item** 🛎️
   - Verify users can add new items to a list.
   - Ensure items can be edited, marked as completed, and deleted.

4. **Data Persistence After Logout/Login** 🔄
   - Validate that lists and reminders persist after logging out and back in.

5. **Basic Accessibility Checks** ♿
   - Check for missing ARIA landmarks, language attributes, tabbing issues, and contrast errors.

## 🌍 Cross-Browser Testing
Tests are executed **in parallel** across the following browsers:
- ✅ Chromium (Google Chrome)
- ✅ Firefox
- ✅ WebKit (Safari)

## 🛠️ Configuration & Debugging
- Modify `playwright.config.ts` to adjust settings like **base URL, retries, tracing, and video recording**.
- Run tests in **debug mode**:
  ```sh
  npx playwright test --debug
  ```
- Capture **screenshots on failure**:
  ```sh
  use: { screenshot: 'only-on-failure' }
  ```

## 🔄 Continuous Integration (Optional)
To run tests automatically on GitHub Actions:
```sh
git add .github/workflows/playwright.yml
git commit -m "Added GitHub Actions workflow"
git push origin main
```

## 🤝 Contributing
If you'd like to contribute to improving the test suite, feel free to submit a **pull request** or open an **issue**.

## 📜 License
This project is open-source and available under the **MIT License**.

---
**Built with 🫶🏻 and Playwright** 🎭 by Erin Crise
