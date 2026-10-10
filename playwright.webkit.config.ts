import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/compatibility",
  timeout: 90_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "iphone-se-webkit", use: { ...devices["iPhone SE"] } },
    { name: "iphone-13-webkit", use: { ...devices["iPhone 13"] } },
    { name: "iphone-14-pro-max-webkit", use: { ...devices["iPhone 14 Pro Max"] } },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
