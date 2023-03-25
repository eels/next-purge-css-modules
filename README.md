<div align="center">
  <h1>
    <br />
    <div>:construction_worker:</div>
    <br />
    <div>next-purge-css-modules</div>
    <br />
  </h1>
  <br />
  <div>Easily remove unused css-module code in your <a href="https://github.com/vercel/next.js">Next.js</a> application</div>
  <br />
  <a href="https://www.npmjs.com/package/next-purge-css-modules"><img src="https://img.shields.io/npm/v/next-purge-css-modules?style=flat-square" /></a>
  <a href="https://coveralls.io/github/eels/next-purge-css-modules"><img src="https://img.shields.io/coveralls/github/eels/next-purge-css-modules?label=Coverage&style=flat-square" /></a>
  <a href="https://github.com/eels/next-purge-css-modules/actions/workflows/codeql-analysis.yml"><img src="https://img.shields.io/github/actions/workflow/status/eels/next-purge-css-modules/codeql-analysis.yml?branch=main&label=CodeQL&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/next-purge-css-modules"><img src="https://img.shields.io/npm/dm/next-purge-css-modules?label=Downloads&style=flat-square" /></a>
  <br /><br />
  <pre>yarn add <a href="https://www.npmjs.com/package/next-purge-css-modules">next-purge-css-modules</a> --dev</pre>
  <h1></h1>
</div>

## Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
- [Configuration](#configuration)
- [Usage With Sass](#usage-with-sass)
- [Contributing](#contributing)
- [License](#license)

## Installation

`next-purge-css-modules` can be installed using your favourite JavaScript package manager.

```bash
yarn add next-purge-css-modules --dev
```

```bash
npm install next-purge-css-modules --save-dev
```

## Example Usage

If your Next.js project does not already contain one, create a `next.config.js` file in the root of your project directory.

```js
const withPurgeCSSModules = require('next-purge-css-modules');

const nextConfig = { ... };

module.exports = withPurgeCSSModules(nextConfig);
```

You can read more about the advanced configuration of Next.js on the [official documentation site](https://nextjs.org/docs/api-reference/next.config.js/introduction).

## Configuration

This plugin comes preconfigured with some sensible defaults options. However, you are free to alter this configuration to suit your project needs with the use of the custom next config object via the `next.config.js` file.

```ts
interface PurgeCSSModulesOptions {
  content: string | string[];
  enableDevPurge: boolean;
  fontFace: boolean;
  keyframes: boolean;
  safelist: UserDefinedSafelist;
  variables: boolean;
}
```

```js
const path = require('path');
const withPurgeCSSModules = require('next-purge-css-modules');

const nextConfig = {
  purgeCSSModules: {
    content: path.join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    enableDevPurge: true,
    safelist: ['body', 'html'],
  }
};

module.exports = withPurgeCSSModules(nextConfig);
```

### `content`

This option tells `next-purge-css-modules` which files to look through to check for unused css-modules. You can either supply these files as absolute paths or as file path globs and can either be a single path or as an array.

The default value looks at all JavaScript/TypeScript files in the two default Next.js pages directorys (`pages/**/*.{js,jsx,ts,tsx}` and `src/pages/**/*.{js,jsx,ts,tsx}`).

### `enableDevPurge`

By default, your css-module code will only be purged when a `production` build is generated. You can set this flag to `true` to enable css-modules purging when running your Next.js project in `development` mode.

### `fontFace`

If there are any unused @font-face rules, setting this flag to `true` will purge them from the final output.

### `keyframes`

Any unused animation keyframes found within your css-module code will be purged from the final output when this flag is set the `true`.

### `safelist`

By supplying an array of css selectors to the `safelist` option, you can tell `next-purge-css-modules` which selectors you wish to ensure are not purged.

To read more about the `safelist` configuration option, you can refer to the official [PurgeCSS documentation](https://purgecss.com/configuration.html).

### `variables`

When you are using Custom Properties (CSS variables), or a library using them such as Bootstrap, setting this flag to `true` will purge them from the final output.

## Usage With Sass

`next-purge-css-modules` works directly out of the box with Next.js projects set up to use Sass.

You can refer to the [official Next.js Sass documentation](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) to ensure your project is set up correctly.

## Contributing

Thanks for taking the time to contribute! Before you get started, please take a moment to read through our [contributing guide](https://github.com/eels/next-purge-css-modules/blob/main/.github/CONTRIBUTING.md). The focus area for `next-purge-css-modules` right now is fixing potential bugs.

However, all issues and PRs are welcome!

## License

MIT - see the [LICENSE.md](https://github.com/eels/next-purge-css-modules/blob/main/LICENSE.md) file for details
