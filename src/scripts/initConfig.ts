/**初始化全局配置 */
import path from 'node:path';
import { readJsFileSnyc } from "../tool";
import { isObject } from '../tool/variable-type';
const globalVariable = {}
const defaultOptionsMap = {
  dev_web: {
    entry: './src/app.tsx',
    inlineStyle: true,
    globalVariable
  },
  build_spa: {
    entry: './src/app.tsx',
    remotePublic: undefined, // https://teng.cdn.com/
    globalVariable
  },
  ['ssr-material']: {
    entry: {
      routes: './src/routes/route-map-ssr.ts',
      store: './src/store/index.ts'
    },
    inlineStyle: true,
    globalVariable
  }
}
const defaultOptions = defaultOptionsMap[process.env.MODE as keyof (typeof defaultOptionsMap)];
const content = readJsFileSnyc(path.resolve(process.cwd(), `pack.${process.env.MODE}.js`))
if (isObject(content)) {
  global.project_config = {
    ...defaultOptions,
    ...content
  };
} else {
  global.project_config = defaultOptions
}

console.log(2223, global.project_config);
