![image](https://github.com/user-attachments/assets/a202cd0e-8735-443c-9b6c-f522028d5c1c) 
# **Bulldoggy Test Plan**
## **Project Overview**
Bulldoggy is a cross-platform reminders app built with **FastAPI and HTMX**. This test plan defines the approach for validating its **functional, API, UI, performance, and accessibility aspects** across **web and mobile** platforms.

---

## 🎯 **Objectives**
Bulldoggy is built to be a seamless, intuitive reminders app, and our testing strategy ensures it stays that way. From creating and modifying reminder lists to marking them complete, our goal is to guarantee every interaction feels effortless. Data persistence across web and mobile is key. Reminders should always be where users expect them, no matter the device. With public API access, reliability and security are paramount, ensuring smooth integrations and safe user experiences. We’re taking Bulldoggy through its paces across multiple browsers and platforms, ensuring a consistent and accessible experience for all users.

---

## 🏗️ **Scope**
### ✅ **In Scope**
- **Web UI Testing**: User interactions with reminders.
- **API Testing**: Validation of API endpoints.
- **Cross-Browser Testing**: Chromium, Firefox, WebKit.
- **Mobile Compatibility**: Android and iOS.
- **Accessibility Compliance**: ARIA roles, keyboard navigation, contrast checks.
- **Performance Testing**: Load testing for high user adoption.

### ❌ **Out of Scope**
- Native Mobile App Testing (Separate project).
- Security Penetration Testing (Handled separately).

---

## 🔍 **Test Approach**
### 1️⃣ **Functional Testing**
✅ User authentication (Login and Logout).  
✅ Reminder List CRUD operations.  
✅ Reminder Item CRUD operations.  
✅ UI behavior for completed reminders.  
✅ Validation of error handling for invalid inputs.  

### 2️⃣ **API Testing**
✅ CRUD operations via API.  
✅ Authentication & Authorization validation.  
✅ API response structure and status codes.  
✅ Rate limiting and timeout handling.  

### 3️⃣ **Cross-Browser & Cross-Platform Testing**
✅ Tests will be executed in **Chromium, Firefox, and WebKit**.  
✅ Mobile UI compatibility on **Android & iOS browsers**.  

### 4️⃣ **Accessibility Testing**
✅ WCAG 2.1 compliance.  
✅ ARIA landmarks, alt text, and semantic HTML checks.  
✅ Keyboard navigation and tab ordering.  

### 5️⃣ **Performance Testing**
✅ Load testing to simulate **high user traffic scenarios**.  
✅ Stress testing API under peak conditions.  

---

## 🚀 **Automation Strategy**
### 🧩 **Behavior-Driven Development (BDD) Approach**
- Tests are written using BDD principles to improve collaboration and clarity.
- Ensures alignment between product owners, developers, and testers by defining clear acceptance criteria.
- Gherkin syntax is used for defining test scenarios in a human-readable format.

### 🛠️ **Tools & Frameworks**
- **Test Automation**: Playwright (TypeScript).
- **API Testing**: Playwright API Testing + Postman or Bruno.
- **CI/CD**: GitHub Actions for automated test execution.
- **Performance Testing**: k6 or JMeter.
- **Accessibility Audits**: WAVE, Lighthouse.

### 🎭 **Playwright Automation Strategy**
- **Test cases are automated using Playwright for web UI interactions.**
- **Tests run in parallel** across Chromium, Firefox, and WebKit.
- **Test failures capture screenshots & logs automatically.**
- **GitHub Actions triggers tests on PRs & merges.**

---

## 📌 **Test Environment & Setup**
### **Local Setup**
**Run Bulldoggy app locally:**
  ```sh
  uvicorn app.main:app --reload
  ```
### **Execute tests:**
  ```sh
  npx playwright test --parallel
  ```

---

## 🏁 **CI/CD Execution**
- Automated Playwright tests run on every code push to GitHub.
- Performance and API tests run on-demand or on schedule.

---

## 🔄 **Defect Tracking & Reporting**
- Bugs are logged (in ticket tracking system).
- Reports are generated using Playwright Test Reports & CI logs.

---

## 🧘 **Conclusion**
This strategy ensures Bulldoggy is tested **thoroughly across UI, API, and accessibility** layers, maintaining high reliability, usability, and scalability.

---

### 🧐 **Erin is Curious About**
- **TestIds:** Looked through demo-todo-app.spec.ts and noticed there's use of getByTestId, for example. Would love to implement TestIds as early as possible. Tell me more about how Cycle Labs uses TestIds, please.
- **User Password & Account Management:** Can users Reset their password? What is the current process for password reset? Can a reset be request on behalf of another user (is there a Super User)? What happens if a user decides to deactive their account; is there a Reactivation flow?
- **Notifications:** This is a reminders app, afterall. What are the notifications like? Can we change the sounds? Are notifications platform agnostic?
- **Data Validation & Storage:** Ensuring user data is stored correctly in the cloud and remains consistent across web and mobile. This includes schema validation, data integrity checks, and API data format consistency.
- **Contract Testing:** Is this a viable approach for Bulldoggy's APIs? If so, when in the development lifecycle should this be introduced?
- **Integration Testing with Other Productivity Tools:** How will Bulldoggy integrate with Pony Express (calendar), Cattitude (proofreader), and Blabberwok (sketchpad)? How can we ensure seamless data sharing?
- **SEO Considerations:** Is search engine optimization relevant yet? Who is tracking these metrics, and should we be incorporating SEO validation into our tests? What tools are being used to measure this?
- **Future Feature - Shared Groups:** How could sharing lists with read-only or edit privileges be implemented? What potential security risks or UI/UX concerns should be considered?
- **Future Feature - Theming & Accessibility:** The story mentions themes, will this include high-contrast modes, dark mode, and a11y-friendly options? How can we ensure these comply with accessibility standards?
