import ValidWebpackConfigInput from '@test/__mocks__/webpack-configs/valid-webpack-config-input';
import ValidWebpackConfigOutput from '@test/__mocks__/webpack-configs/valid-webpack-config-output';
import WebpackConfigNoRules from '@test/__mocks__/webpack-configs/webpack-config-no-rules';
import WebpackConfigNoUseArray from '@test/__mocks__/webpack-configs/webpkac-config-no-use-array';
import WebpackConfigNoValidLoaders from '@test/__mocks__/webpack-configs/webpkac-config-no-valid-loaders';
import createCustomWebpackConfig from '@src/lib/createCustomWebpackConfig';
import createLoader from '@src/lib/createLoader';

jest.mock('@src/lib/createLoader', () => {
  return jest.fn(() => ({ loader: '/custom-postcss-loader/dist/index.js' }));
});

describe('lib/createCustomWebpackConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default config when no valid `oneOf` rules are present', () => {
    const config = Object.assign({}, WebpackConfigNoRules);
    const output = createCustomWebpackConfig(config, {});

    expect(output).toEqual(config);
  });

  it('should return the same input as the output when the no valid `use` array is found', () => {
    const config = Object.assign({}, WebpackConfigNoUseArray);
    const output = createCustomWebpackConfig(config, {});

    expect(output).toEqual(config);
  });

  it('should return the default config when no valid loaders are present', () => {
    const config = Object.assign({}, WebpackConfigNoValidLoaders);
    const output = createCustomWebpackConfig(config, {});

    expect(output).toEqual(config);
  });

  it('should return a modified config when valid loaders are present', () => {
    const paths = ['example/path.js'];
    const nextConfig = { purgeCSSModules: { content: paths } };
    const config = Object.assign({}, ValidWebpackConfigInput);
    const output = createCustomWebpackConfig(config, nextConfig);

    expect(output).toEqual(ValidWebpackConfigOutput);
    expect(createLoader).toHaveBeenNthCalledWith(2, nextConfig);
  });
});
