import createLoader from '@src/lib/createLoader';
import type { Config, WebpackConfig, WebpackModuleMultiRule } from '@types';

export default function createCustomWebpackConfig(config: WebpackConfig, nextConfig: Config) {
  const STYLES_LOADER_REGEX = /\/(css|sass)-loader\/(?:cjs|dist|src)/;
  const rules = config.module.rules as WebpackModuleMultiRule[];
  const targetRules = rules.find((rule) => rule.oneOf !== undefined);
  const stylingRules = targetRules?.oneOf?.filter?.(({ use }) => Array.isArray(use)) || [];

  for (const { test, use } of stylingRules) {
    if (!use.some(({ loader }) => STYLES_LOADER_REGEX.test(loader))) {
      continue;
    }

    const isPureCSSLoader = /\.css\$/.test(test.toString());
    const useEntries = Object.entries(use);

    for (const [index, { loader }] of useEntries) {
      if (!STYLES_LOADER_REGEX.test(loader)) {
        continue;
      }

      if (/\/css-loader\//.test(loader) && isPureCSSLoader) {
        use.push(createLoader(nextConfig));
      }

      if (/\/sass-loader\//.test(loader)) {
        use.splice(parseInt(index), 0, createLoader(nextConfig));
      }
    }
  }

  return config;
}
