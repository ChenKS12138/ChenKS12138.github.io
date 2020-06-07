const path = require("path");
module.exports = {
  onCreateWebpackConfig(options) {
    const { stage, actions } = options;
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "@": path.resolve("src"),
        },
      },
    });
  },
};
