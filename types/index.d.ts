import type { NextConfig } from 'next/dist/server/config-shared';
import type { UserDefinedSafelist } from '@fullhuman/postcss-purgecss';

export type ExtractFnArgs<T> = T extends (...args: infer U) => any ? U : never;

export type Config = NextConfig & {
  purgeCSSModules?: {
    content?: string | string[];
    enableDevPurge?: boolean;
    fontFace?: boolean;
    keyframes?: boolean;
    safelist?: UserDefinedSafelist;
    variables?: boolean;
  };
};

export type WebpackFactoryArgs = ExtractFnArgs<Config['webpack']>;

export type WebpackConfig = WebpackFactoryArgs['0'];

export type WebpackContext = WebpackFactoryArgs['1'];

export type WebpackModuleLoader = { loader: string };

export type WebpackModuleRule = { test: RegExp; use: WebpackModuleLoader[] };

export type WebpackModuleMultiRule = { oneOf?: WebpackModuleRule[] };
