import createLoader from '@src/lib/createLoader';
import mockLoaderOutput from '@test/__mocks__/mock-loader-output';

jest.mock('@src/lib/createGlobPathArray', () => jest.fn((paths) => paths));
jest.mock('postcss', () => jest.fn());

describe('lib/createLoader', () => {
  it('should return an object', () => {
    const output = createLoader('example');

    expect(typeof output).toBe('object');
    expect(Array.isArray(output)).not.toBeTruthy();
  });

  it('should return an object of a required shaped', () => {
    const output = createLoader('example');
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
    expect(JSON.stringify(createLoader('example'))).toEqual(JSON.stringify(mockLoaderOutput));
  });

  it('should wrap string arguments in an array', () => {
    const output = createLoader('example').options.postcssOptions();
    const pluginContent = output.plugins;

    expect(Array.isArray(pluginContent)).toBeTruthy();
    expect(typeof pluginContent[0][0]).toBe('string');
    expect(pluginContent[0][1].content).toEqual(['example']);
  });

  it('should keep maintain array arguments as-is', () => {
    const output = createLoader(['example']).options.postcssOptions();
    const pluginContent = output.plugins;

    expect(Array.isArray(pluginContent)).toBeTruthy();
    expect(pluginContent[0][1].content).toEqual(['example']);
  });
});
