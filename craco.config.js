/* eslint-disable import/no-extraneous-dependencies */
const { ESLINT_MODES } = require("@craco/craco");
const CracoAlias = require("craco-alias");

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "https://barnens-h22.multi.test",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  },
  eslint: {
    mode: ESLINT_MODES.file,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: "./src",
        source: "tsconfig",
        tsConfigPath: "./tsconfig.extend.json",
      },
    },
  ],
};
