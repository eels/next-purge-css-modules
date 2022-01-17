export default {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: '/*.module.css$/',
            use: '',
          },
        ],
      },
    ],
  },
};
