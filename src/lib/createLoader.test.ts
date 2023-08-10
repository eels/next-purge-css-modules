import createLoader from '@src/lib/createLoader';
import mockLoaderOutput from '@src/__mocks__/mock-loader-output';
import mockPurgeConfig from '@src/__mocks__/mock-purge-config';

jest.mock('@src/lib/createGlobPathArray', () => jest.fn((paths) => paths));
jest.mock('postcss', () => jest.fn());

describe('lib/createLoader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object', () => {
    const output = createLoader(mockPurgeConfig);

    expect(typeof output).toBe('object');
    expect(Array.isArray(output)).not.toBeTruthy();
  });

  it('should return an object of a required shaped', () => {
    const output = createLoader(mockPurgeConfig);
    const outputKeys = Object.keys(output);
    const outputOptionKeys = Object.keys(output.options);

    expect(outputKeys).toEqual(['loader', 'options']);
    expect(outputOptionKeys).toEqual(['postcssOptions']);
    expect(output.options.postcssOptions).toBeInstanceOf(Function);

    const postcssOptionsOutput = output.options.postcssOptions();
    const postcssOptionsOutputKeys = Object.keys(postcssOptionsOutput);

    expect(postcssOptionsOutputKeys).toEqual(['config', 'implementation', 'plugins']);
  });

  it('should serialize to the same expected output given specific inputs', () => {
    expect(JSON.stringify(createLoader(mockPurgeConfig))).toEqual(JSON.stringify(mockLoaderOutput));
  });

  it('should wrap content path string arguments in an array', () => {
    mockPurgeConfig.content = 'example';

    const output = createLoader(mockPurgeConfig).options.postcssOptions();
    const pluginContent = output.plugins;

    expect(Array.isArray(pluginContent)).toBeTruthy();
    expect(typeof pluginContent[0][0]).toBe('string');
    expect((pluginContent[0][1] as any).content).toEqual(['example']);
  });

  it('should maintain content path array arguments as-is', () => {
    const output = createLoader(mockPurgeConfig).options.postcssOptions();
    const pluginContent = output.plugins;

    expect(Array.isArray(pluginContent)).toBeTruthy();
    expect((pluginContent[0][1] as any).content).toEqual(['example']);
  });

  it('should return valid content value if none is provided via the next config', () => {
    delete mockPurgeConfig.content;

    const output = createLoader(mockPurgeConfig).options.postcssOptions();
    const pluginContent = output.plugins;

    expect((pluginContent[0][1] as any).content).toEqual([]);
  });
});
