import createGlobPathArray from '@src/lib/createGlobPathArray';
import type { PurgeConfig } from '@types';

export default function createLoader(purgeConfig: PurgeConfig) {
  const content = purgeConfig?.content || [];
  const contentArray = Array.isArray(content) ? content : [content];

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
              content: createGlobPathArray(contentArray),
              fontFace: purgeConfig?.fontFace,
              keyframes: purgeConfig?.keyframes,
              safelist: purgeConfig?.safelist,
              variables: purgeConfig?.variables,
            },
          ],
        ],
      }),
    },
  };
}
