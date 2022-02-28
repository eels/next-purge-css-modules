import createGlobPathArray from '@src/lib/createGlobPathArray';
import type { Config } from '@types';

export default function createLoader(nextConfig: Config) {
  const content = nextConfig.purgeCSSModules?.content || [];
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
              fontFace: nextConfig.purgeCSSModules?.fontFace,
              keyframes: nextConfig.purgeCSSModules?.keyframes,
              safelist: nextConfig.purgeCSSModules?.safelist,
              variables: nextConfig.purgeCSSModules?.variables,
            },
          ],
        ],
      }),
    },
  };
}
