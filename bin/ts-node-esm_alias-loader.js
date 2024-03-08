// // `loader.js`
// import {
//   resolve as resolveTs,
//   getFormat,
//   transformSource,
// } from "ts-node/esm";
// import * as tsConfigPaths from "tsconfig-paths"

// export { getFormat, transformSource };

// const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
// const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

// export function resolve(specifier, context, defaultResolver) {
//   const mappedSpecifier = matchPath(specifier)
//   console.log(1111999,specifier, mappedSpecifier)
//   if (mappedSpecifier) {
//     specifier = `${mappedSpecifier}.js`
//   }
//   return resolveTs(specifier, context, defaultResolver);
// }


// import { resolve as resolveTs } from 'ts-node/esm'
// import * as tsConfigPaths from 'tsconfig-paths'
// import { pathToFileURL } from 'url'

// const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
// const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

// export function resolve (specifier, ctx, defaultResolve) {
//   const match = matchPath(specifier)
//   console.log(1999,specifier)
//   return match
//     ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
//     : resolveTs(specifier, ctx, defaultResolve)
// }

// export { load, transformSource } from 'ts-node/esm'



// loader.js
import { isBuiltin } from 'node:module';
import { dirname } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

import resolveCallback from 'resolve';
import { resolve as resolveTs, load } from 'ts-node/esm';
import { loadConfig, createMatchPath } from 'tsconfig-paths';

const resolveAsync = promisify(resolveCallback);
const tsExtensions = new Set(['.tsx', '.ts', '.mts', '.cts']);
// 这里可以自定义
const { absoluteBaseUrl, paths } = loadConfig(process.cwd());
const matchPath = createMatchPath(absoluteBaseUrl, paths);

async function resolve(specifier, ctx, defaultResolve) {
  const { parentURL = pathToFileURL(absoluteBaseUrl) } = ctx;
  if (isBuiltin(specifier)) { return defaultResolve(specifier, ctx); }

  if (specifier.startsWith('file://')) { specifier = fileURLToPath(specifier); }

  let url;
  try {
    const resolution = await resolveAsync(matchPath(specifier) || specifier, {
      basedir: dirname(fileURLToPath(parentURL)),
      // For whatever reason, --experimental-specifier-resolution=node doesn't search for .mjs extensions
      // but it does search for index.mjs files within directories
      extensions: ['.js', '.node', '.mjs', ...tsExtensions,'.json'],
    });
    url = pathToFileURL(resolution).href;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      // Match Node's error code
      error.code = 'ERR_MODULE_NOT_FOUND';
    }
    throw error;
  }

  return resolveTs(url, ctx, defaultResolve)
}

export { resolve, load };
