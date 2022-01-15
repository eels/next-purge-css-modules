import createGlobPathArray from '@src/lib/createGlobPathArray';

export default function createLoader(paths: string | string[]) {
  const pathArray = Array.isArray(paths) ? paths : [paths];

  return {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: () => ({
        config: false,
        implementation: require('postcss'),
        plugins: [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: createGlobPathArray(pathArray),
            },
          ],
        ],
      }),
    },
  };
}
