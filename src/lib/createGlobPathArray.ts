import glob from 'glob';

export default function createGlobPathArray(paths: string[]) {
  return paths.reduce((globs, path) => {
    return [...globs, ...glob.sync(path, { nodir: true })];
  }, <string[]>[]);
}
