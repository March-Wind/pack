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
    name: "env",
    short: "e",
    type: "string",
    description: "web-pack run in devlopment or production",
    example: "'script --env=value' or 'script -e value'",
  }
]);

const args = argv.run();
const {
  options: { mode, config, debug = false, env = 'production' },
} = args;
const tsNode = resolve(__dirname, "../node_modules/ts-node/register");
const tsNodeESM = resolve(__dirname, "../node_modules/ts-node/esm");
// const tsConfig = resolve(__dirname, "../src/webpack/tsconfig.json");
const tsConfig2 = resolve(__dirname, "../tsconfig.json");
const nodeModule = resolve(__dirname, "../node_modules");
const _mode = mode.replace(":", "_");
const globalVar = `TS_NODE_PROJECT=${tsConfig2} PROJECT_CONFIG=${config} NODE_ENV=${env} NODE_MODULES_PATH=${nodeModule} MODE=${_mode}`;
const nodeParams = `${debug ? '--inspect-brk=9222' : ''} --loader ts-node/esm`;
const modeMapFile = {
  "dev:web": resolve(__dirname, "../src/scripts/dev.ts"),
  "build:spa": resolve(__dirname, "../src/scripts/build.spa.ts"),
  "build:ssr": resolve(__dirname, "../src/scripts/build.ssr.ts"),
}
const execFile = modeMapFile[mode];
// throw new Error("暂时没有build:offline");
if (execFile) {
  console.log(22, `${globalVar} node ${nodeParams} ${execFile}`)
  shell.exec(
    `${globalVar} node ${nodeParams} ${execFile}`
  );

  // shell.exec(
  //   `${globalVar} node ${nodeParams}  ${execFile}`
  // );
} else {
  throw new Error("没有对应的mode");

}
