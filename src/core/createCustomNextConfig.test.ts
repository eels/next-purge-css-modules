import createCustomNextConfig from '@src/core/createCustomNextConfig';
import createWebpackConfig from '@src/lib/createWebpackConfig';
import mockNextConfig from '@src/__mocks__/mock-next-config';
import mockPurgeConfig from '@src/__mocks__/mock-purge-config';
import type { WebpackContext, WebpackFactoryArgs } from '@types';

jest.mock('@src/lib/createWebpackConfig', () => {
  return jest.fn((config) => ({ ...config }));
});

describe('core/createCustomNextConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object', () => {
    const output = createCustomNextConfig(mockPurgeConfig, mockNextConfig);

    expect(output).toBeInstanceOf(Object);
  });

  it('should return an object containing the default config options', () => {
    const output = createCustomNextConfig({}, mockNextConfig);

    expect(output).toEqual(expect.objectContaining(mockNextConfig));
  });

  it('should return an object with a key named `webpack` that has a function value', () => {
    const output = createCustomNextConfig(mockPurgeConfig, mockNextConfig);
    const outputKeys = Object.keys(output);

    expect(outputKeys).toContain('webpack');
    expect(output.webpack).toBeInstanceOf(Function);
  });

  it('should extend the return object with values provided by the parameter', () => {
    const config = { minify: true };

    expect(createCustomNextConfig({}, {})).not.toEqual(expect.objectContaining(config));
    expect(createCustomNextConfig({}, config)).toEqual(expect.objectContaining(config));
  });

  it('should call the `webpack` function provided via the parameter if it is a function', () => {
    const mockWebpackFunction = jest.fn();
    const mockWebpackArguments = [{}, {}] as unknown as WebpackFactoryArgs;
    const output = createCustomNextConfig({}, { webpack: mockWebpackFunction });

    output.webpack.apply(null, mockWebpackArguments);

    expect(mockWebpackFunction).toHaveBeenCalledWith(...mockWebpackArguments);
  });

  it('should return the standard webpack config when the `webpack` function is called and purge is not enabled', () => {
    const config = { devtool: 'eval-cheap-source-map' };
    const context = { config: mockNextConfig, dev: true } as unknown as WebpackContext;
    const output = createCustomNextConfig({ enableDevPurge: false }, mockNextConfig);

    expect(output.webpack(config, context)).toEqual(config);
    expect(createWebpackConfig).not.toHaveBeenCalled();
  });
});
