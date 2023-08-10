import type { NextConfig } from 'next/types/index.d';
import type { UserDefinedSafelist } from '@fullhuman/postcss-purgecss';

export type ExtractFnArgs<T> = T extends (...args: infer U) => any ? U : never;

export interface PurgeConfig {
  content?: string | string[];
  enableDevPurge?: boolean;
  fontFace?: boolean;
  keyframes?: boolean;
  safelist?: UserDefinedSafelist;
  variables?: boolean;
}

export type WebpackFactoryArgs = ExtractFnArgs<NextConfig['webpack']>;

export type WebpackConfig = WebpackFactoryArgs['0'];

export type WebpackContext = WebpackFactoryArgs['1'];

export type WebpackModuleLoader = {
  loader: string;
};

export type WebpackModuleRule = {
  test: RegExp;
  use: WebpackModuleLoader[];
};

export type WebpackModuleMultiRule = {
  oneOf?: WebpackModuleRule[];
};

export default function withPurgeCSSModules(purgeConfig?: PurgeConfig, nextConfig?: NextConfig);
