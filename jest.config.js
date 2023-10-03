
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/tests/*.spec.js"
  ],
  bail: true
};

module.exports = config;
