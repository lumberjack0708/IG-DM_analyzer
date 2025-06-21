module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "prettier/prettier": "off",
    "linebreak-style": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
