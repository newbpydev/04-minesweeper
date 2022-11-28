module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },

  // .storybook/main.js
  async viteFinal(config) {
    config.server.port = 6001;
    config.server.https = false;
    config.server.host = true;
    config.server.hmr = {
      port: 443,
      protocol: "ws",
    };

    return config;
  },
};
// }
