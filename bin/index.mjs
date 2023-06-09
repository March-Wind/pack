#! /usr/bin/env node
import argv from "argv";
import shell from "shelljs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
argv.option([
  {
    name: "mode",
    short: "m",
    type: "string",
    description: "dev:web, dev:node, build:web, build:node",
    example: "'script --mode=value' or 'script -m value'",
  },
  {
    name: "config",
    short: "c",
    type: "string",
    description: "config file",
    example: "'script --config=value' or 'script -c value'",
  },
  {
    name: "debug",
    short: "d",
    type: "string",
    description: "debug webpack",
    example: "'script --debug=value' or 'script -d value'",
  }, {
    name: "NODE_ENV",
    short: "e",
    type: "string",
    description: "web-pack run in devlopment or production",
    example: "'script --NODE_ENV=value' or 'script -e value'",
  }, {
    name: "DOT_ENV",
    short: "de",
    type: "string",
    description: "The environment in which the project is located",
    example: "'script --DOT_ENV=value' or 'script -pe value'",
  }
]);

const args = argv.run();
const {
  options: { mode, config, debug = false, NODE_ENV: env, DOT_ENV = 'production' },
} = args;
const tsNode = resolve(__dirname, "../node_modules/ts-node/register");
const tsNodeESM = resolve(__dirname, "../node_modules/ts-node/esm");
// const tsConfig = resolve(__dirname, "../src/webpack/tsconfig.json");
const tsConfig2 = resolve(__dirname, "../tsconfig.json");
const nodeModule = resolve(__dirname, "../node_modules");
const preload = resolve(__dirname, './preload.cjs')
const _mode = mode.replace(":", "_");

const modeMapConfig = {
  "dev:web": {
    NODE_ENV: 'development',
    file: resolve(__dirname, "../src/scripts/dev.web.ts"),
  },
  "build:spa": {
    NODE_ENV: 'production',
    file: resolve(__dirname, "../src/scripts/build.spa.ts"),
  },
  "build:ssr": {
    NODE_ENV: 'production',
    file: resolve(__dirname, "../src/scripts/build.ssr.ts"),
  },
  "dev:node": {
    NODE_ENV: 'development',
    file: resolve(process.cwd(), 'src/app.ts'),
  },
  "build:node": {
    NODE_ENV: 'production',
    file: resolve(__dirname, "../src/scripts/build.node.ts"),
  }
}
const execConfig = modeMapConfig[mode];
if (!execConfig) {
  throw new Error("没有对应的mode");
}
const { file, NODE_ENV } = execConfig;
const globalVar = `TS_NODE_PROJECT=${tsConfig2} PROJECT_CONFIG=${config} NODE_ENV=${env || NODE_ENV} NODE_MODULES_PATH=${nodeModule} MODE=${_mode} DOT_ENV=${DOT_ENV}`;
const nodeParams = `${debug ? '--inspect-brk=9222' : ''} --experimental-wasm-modules ${mode === 'dev:node' ? `-r ${preload}` : ''} --loader ts-node/esm`;
shell.exec(
  `${globalVar} node ${nodeParams} ${file}`
);
