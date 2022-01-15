import createCustomWebpackConfig from '@src/lib/createCustomWebpackConfig';
import path from 'path';
import type { Config, WebpackConfig, WebpackContext, WebpackFactoryArgs } from '@types';

const initialDefaultConfig: Config = {
  purgeCSSModules: {
    content: [
      path.join(process.cwd(), 'pages/**/*.{js,jsx,ts,tsx}'),
      path.join(process.cwd(), 'src/pages/**/*.{js,jsx,ts,tsx}'),
    ],
    enableDevPurge: false,
  },
};

export default function createCustomNextConfig(nextConfig: Config = {}) {
  return <Config>Object.assign({}, initialDefaultConfig, nextConfig, {
    webpack: function (config: WebpackConfig, { dev }: WebpackContext) {
      const webpackFactoryArgs = (<unknown>arguments) as WebpackFactoryArgs;
      const shouldPurgeCSS = !dev || nextConfig.purgeCSSModules?.enableDevPurge;

      if (nextConfig.webpack) {
        config = nextConfig.webpack.apply(null, webpackFactoryArgs);
      }

      return shouldPurgeCSS ? createCustomWebpackConfig(config, nextConfig) : config;
    },
  });
}
