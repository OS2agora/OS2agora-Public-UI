import { StorybookConfig } from "@storybook/nextjs";

/* eslint-disable global-require */
module.exports = {
  stories: ["../stories/*.@(mdx|stories.@(ts|tsx|js|jsx))"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
};
