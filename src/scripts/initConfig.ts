/**初始化全局配置 */
import path from 'node:path';
import { readJsFileSnyc } from '../tool';
import { isObject } from '../tool/variable-type';
const globalVariable = {};
const defaultOptionsMap = {
  dev_web: {
    entry: './src/app.tsx',
    inlineStyle: true,
    globalVariable,
  },
  build_spa: {
    entry: './src/app.tsx',
    remotePublic: undefined, // https://teng.cdn.com/
    globalVariable,
  },
  dev_node: {
    entry: './src/app.ts',
  },
  build_node: {
    entry: './src/app.ts',
  },
  ['ssr-material']: {
    entry: {
      routes: './src/routes/route-map-ssr.ts',
      store: './src/store/index.ts',
    },
    inlineStyle: true,
    globalVariable,
  },
};
const defaultOptions = defaultOptionsMap[process.env.MODE as keyof typeof defaultOptionsMap];
const userConfigFile = process.env.PROJECT_CONFIG;
// 最终的配置文件
let finalConfigFile = path.resolve(process.cwd(), `pack.config.cjs`);
if (userConfigFile?.startsWith('/')) {
  // 绝对路径
  finalConfigFile = userConfigFile;
}
if (userConfigFile?.startsWith('./')) {
  // 相对路径
  finalConfigFile = path.resolve(process.cwd(), userConfigFile);
}
const content = readJsFileSnyc(finalConfigFile);
if (isObject(content)) {
  global.project_config = {
    ...defaultOptions,
    ...content[process.env.MODE as keyof typeof defaultOptionsMap],
  };
} else {
  global.project_config = defaultOptions;
}
