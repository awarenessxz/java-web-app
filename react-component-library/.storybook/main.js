const path = require('path');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    "@storybook/addon-essentials"
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};