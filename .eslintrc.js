module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["mobx"],
  extends: [
    "plugin:mobx/recommended",
    "react-app",
    "react-app/jest",
    "eslint:recommended",
  ],
  rules: {
    "mobx/missing-observer": "off",
  },
};
