/* eslint-disable import/no-extraneous-dependencies */
const { ESLINT_MODES } = require("@craco/craco");
const CracoAlias = require("craco-alias");

module.exports = {
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
