import createWebpackConfig from '@src/lib/createWebpackConfig';
import path from 'path';
import type { NextConfig } from 'next/types/index.d';
import type { PurgeConfig, WebpackConfig, WebpackContext } from '@types';

export const initialDefaultConfig: PurgeConfig = {
  content: [
    path.join(process.cwd(), 'app/**/*.{js,jsx,ts,tsx}'),
    path.join(process.cwd(), 'pages/**/*.{js,jsx,ts,tsx}'),
    path.join(process.cwd(), 'src/app/**/*.{js,jsx,ts,tsx}'),
    path.join(process.cwd(), 'src/pages/**/*.{js,jsx,ts,tsx}'),
  ],
  enableDevPurge: false,
  fontFace: false,
  keyframes: false,
  safelist: ['body', 'html'],
  variables: false,
};

export default function createCustomNextConfig(purge?: PurgeConfig, next?: NextConfig) {
  const resolvedPurgeConfig = { ...initialDefaultConfig, ...purge };

  return {
    ...next,
    webpack: function (config: WebpackConfig, context: WebpackContext) {
      if (typeof next?.webpack === 'function') {
        config = next?.webpack(config, context);
      }

      const shouldPurgeCSS = !context.dev || resolvedPurgeConfig?.enableDevPurge;

      return shouldPurgeCSS ? createWebpackConfig(config, resolvedPurgeConfig) : config;
    },
  };
}
