/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\.ts$': 'ts-jest',
    "^.+\\.svg$": "<rootDir>/src/__testing/svgTransform.js"
  },
  moduleFileExtensions: ['json', 'js', 'vue', 'ts', 'tsx'],
  testMatch: ["<rootDir>/src/__tests__/*.spec.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
