import webpack from 'webpack';
import { resolve } from 'path';
import dotenv from 'dotenv';
// import IMake from '../../plugin/make'
// import IEmit from '../../plugin/emit'
import IThisCompilation from '../../plugin/setBuildTime';
const config = global.project_config;
const { globalVariable = {} } = config;
const NODE_ENV = process.env.NODE_ENV;
const _path = resolve(process.cwd(), `.env.${process.env.DOT_ENV}`);
const dotenvVariable = dotenv.config({ path: _path }).parsed;

const definedVariable = Object.keys({ ...dotenvVariable, ...globalVariable }).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify({ ...dotenvVariable, ...globalVariable }[next]);
  return prev;
}, {} as Record<string, any>);
const webpackConfig: webpack.Configuration = {
  mode: NODE_ENV,
  experiments: {
    topLevelAwait: true, // 顶级作用域使用await
    asyncWebAssembly: true, // 同步加载wasm
    layers: true, // 启用模块和块层可以将Webpack的输出拆分成更小的块，从而使更改单个模块时只需要重新构建相关的块，而不是整个应用程序
  },
  resolve: {
    // modules: [resolve(process.cwd(), 'node_modules'), resolve(__dirname, '../../../node_modules')],
    modules: [resolve(process.cwd(), 'node_modules'), process.env.NODE_MODULES_PATH],

    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    // symlinks: false
  },
  resolveLoader: {
    // modules: [resolve(process.cwd(), 'node_modules'), resolve(__dirname, '../../../node_modules')],
    modules: [resolve(process.cwd(), 'node_modules'), process.env.NODE_MODULES_PATH],
    // roots: [resolve(process.cwd(), 'node_modules'), resolve(__dirname, '../../../node_modules')]
    roots: [resolve(process.cwd(), 'node_modules'), process.env.NODE_MODULES_PATH],
  },
  performance: {
    // 新增性能优化
    maxEntrypointSize: 3072000, // 入口文件大小，推荐244k
  },
  stats: {
    colors: true,
  },
  optimization: {
    concatenateModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      minSize: 102400, //byte   1KB=1024B=1024byte=8192bit。
      maxSize: 204800, //byte
    },
  },
  module: {},
  plugins: [
    new webpack.DefinePlugin(definedVariable),
    // new IMake()
    // new IEmit()
    new IThisCompilation(),
  ],
};

export default webpackConfig;
