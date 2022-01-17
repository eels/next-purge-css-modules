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
          {
            test: '/*.module.css$/',
            use: [
              {
                loader: '/css-loader/dist/index.js',
              },
              {
                loader: '/postcss-loader/dist/index.js',
              },
            ],
          },
          {
            test: '/*.module.s(a|c)ss$/',
            use: [
              {
                loader: '/postcss-loader/dist/index.js',
              },
              {
                loader: '/sass-loader/dist/index.js',
              },
            ],
          },
        ],
      },
    ],
  },
};
