import createGlobPathArray from '@src/lib/createGlobPathArray';
import path from 'path';

describe('lib/createGlobPathArray', () => {
  it('should return an arry of files matching the input of an array of directory globs', () => {
    const glob = [path.join(__dirname, '../__mocks__/glob-files/**/*.txt')];

    expect(createGlobPathArray(glob)).toEqual([
      path.join(__dirname, '../__mocks__/glob-files/example-file-01.txt'),
      path.join(__dirname, '../__mocks__/glob-files/example-file-02.txt'),
    ]);
  });
});
