import createCustomWebpackConfig from '@src/lib/createCustomWebpackConfig';
import path from 'path';
import type { Config, WebpackConfig, WebpackContext } from '@types';

export const initialDefaultConfig: Config = {
  purgeCSSModules: {
    content: [
      path.join(process.cwd(), 'pages/**/*.{js,jsx,ts,tsx}'),
      path.join(process.cwd(), 'src/pages/**/*.{js,jsx,ts,tsx}'),
    ],
    enableDevPurge: false,
  },
};

export default function createCustomNextConfig(nextConfig: Config = {}) {
  return {
    ...nextConfig,

    purgeCSSModules: {
      ...initialDefaultConfig.purgeCSSModules,
      ...nextConfig.purgeCSSModules,
    },

    webpack: function (config: WebpackConfig, context: WebpackContext) {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, context);
      }

      const shouldPurgeCSS = !context.dev || context.config.purgeCSSModules?.enableDevPurge;

      return shouldPurgeCSS ? createCustomWebpackConfig(config, nextConfig) : config;
    },
  };
}
