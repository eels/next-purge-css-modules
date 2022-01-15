import type { NextConfig } from 'next/dist/server/config-shared';

export type ExtractFnArgs<T> = T extends (...args: infer U) => any ? U : never;

export type Config = NextConfig & {
  purgeCSSModules?: {
    content?: string | string[];
    enableDevPurge?: boolean;
  };
};

export type WebpackFactoryArgs = ExtractFnArgs<Config['webpack']>;

export type WebpackConfig = WebpackFactoryArgs['0'];

export type WebpackContext = WebpackFactoryArgs['1'];
