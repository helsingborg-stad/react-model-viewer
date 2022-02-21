/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: ["jest"],
  env: {
    es2021: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      alias: {
        map: [
          // And all your import aliases
          ["@app", "./src"],
          ["@components", "./src/components"],
          ["@theme", "./src/theme"],
          ["@assets", "./src/assets"],
          ["@utils", "./src/utils"],
          ["@graphQL", "./src/graphQL"],
          ["@hooks", "./src/hooks"],
          ["@context", "./src/context"],
          ["@screens", "./src/screens"],
          ["@types", "./src/types"],
          ["@services", "./src/services"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".glb", ".usdz"],
      },
    },
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:react/recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    },
  ],
};

module.exports = config;
