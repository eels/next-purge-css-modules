export default {
  loader: require.resolve('postcss-loader'),
  options: {
    postcssOptions: () => ({
      config: false,
      implementation: require('postcss'),
      plugins: [
        [
          '@fullhuman/postcss-purgecss',
          {
            content: ['example'],
          },
        ],
      ],
    }),
  },
};
