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
            fontFace: false,
            keyframes: false,
            safelist: ['body', 'html'],
            variables: false,
          },
        ],
      ],
    }),
  },
};
