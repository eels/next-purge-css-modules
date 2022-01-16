import createCustomNextConfig, { initialDefaultConfig } from '@src/core/createCustomNextConfig';
import createCustomWebpackConfig from '@src/lib/createCustomWebpackConfig';

jest.mock('@src/lib/createCustomWebpackConfig', () => {
  return jest.fn((config) => ({ ...config, isModified: true }));
});

describe('core/createCustomNextConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object', () => {
    expect(createCustomNextConfig()).toBeInstanceOf(Object);
  });

  it('should return an object containing the default config options', () => {
    expect(createCustomNextConfig()).toEqual(expect.objectContaining(initialDefaultConfig));
  });

  it('should return an object with a key named `webpack` that has a function value', () => {
    const output = createCustomNextConfig();
    const outputKeys = Object.keys(output);

    expect(outputKeys).toContain('webpack');
    expect(output.webpack).toBeInstanceOf(Function);
  });

  it('should extend the return object with values provided by the parameter', () => {
    const config = { minify: true };

    expect(createCustomNextConfig()).not.toEqual(expect.objectContaining(config));
    expect(createCustomNextConfig(config)).toEqual(expect.objectContaining(config));
  });

  it('should override any default properties with values provided by the parameter', () => {
    const modifiedConfig = { purgeCSSModules: { enableDevPurge: true } };
    const originalOutput = createCustomNextConfig();
    const modifiedOutput = createCustomNextConfig(modifiedConfig);

    expect(originalOutput.purgeCSSModules.enableDevPurge).toBe(false);
    expect(modifiedOutput.purgeCSSModules.enableDevPurge).toBe(true);
    expect(Array.isArray(modifiedOutput.purgeCSSModules.content)).toBe(true);
  });

  it('should call the `webpack` function provided via the parameter if it is a function', () => {
    const mockWebpackFunction = jest.fn();
    const mockWebpackArguments = [{}, {}];
    const output = createCustomNextConfig({ webpack: mockWebpackFunction });

    output.webpack(...mockWebpackArguments);

    expect(mockWebpackFunction).toHaveBeenCalledWith(...mockWebpackArguments);
  });

  it('should return the standard webpack config when the `webpack` function is called and purge is not enabled', () => {
    const nextConfig = { purgeCSSModules: { enableDevPurge: false } };
    const config = { devtool: 'eval-cheap-source-map' };
    const context = { config: nextConfig, dev: true };

    expect(createCustomNextConfig().webpack(config, context)).toEqual(config);
    expect(createCustomWebpackConfig).not.toHaveBeenCalled();
  });

  it('should return a modified webpack config when the `webpack` function is called and purge is enabled', () => {
    const nextConfig = { purgeCSSModules: { enableDevPurge: true } };
    const config = { devtool: 'eval-cheap-source-map' };
    const context = (mode: boolean) => ({ config: nextConfig, dev: mode });

    const originalOutput = createCustomNextConfig().webpack(config, context(false));
    const modifiedOutput = createCustomNextConfig(nextConfig).webpack(config, context(true));

    expect(originalOutput).toEqual({ ...config, isModified: true });
    expect(modifiedOutput).toEqual({ ...config, isModified: true });
  });
});
