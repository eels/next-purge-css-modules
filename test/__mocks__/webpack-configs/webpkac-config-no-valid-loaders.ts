export default {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: '/*.example$/',
            use: [
              {
                loader: '/some-other-loader/dist/index.js',
              },
            ],
          },
        ],
      },
    ],
  },
};
