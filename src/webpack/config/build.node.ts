import webpack from 'webpack';
import path from 'path';
import { merge, mergeWithRules } from 'webpack-merge';
import webpackBaseConfig from './base/base';
import webpackModuleConfig from './base/module';
import { defaultOutput } from './contant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
import optimizationConfig from './base/optimization';

const config = global.project_config;
const ssrConfig: webpack.Configuration = {
  entry: config.entry,
  devtool: 'source-map',
  // mode: 'production',
  // mode: 'development',
  target: 'node',
  output: {
    filename: '[name].cjs',
    path: defaultOutput,
    clean: true,
  },
  resolve: {
    // 跟@dqbd/tiktoken有关，也许需要设置@dqbd/tiktoken的alias
    // conditionNames: ['import', 'require'],
    // 针对mongoose引用bson的fix，bug:https://github.com/mongodb/js-bson/pull/564/files
    // MongoDB 的 bson 解析器在 ESM 模式下使用顶级等待和动态导入来避免一些 Webpack 捆绑问题。Next.js 强制使用 ESM 模式。本项目也强制使用了ESM
    fallback: { crypto: false },
  },
  // externals: {
  //   mongoose: 'commonjs mongoose' // 将 mongoose 视为 commonjs 模块
  // },
  // externals: [nodeExternals()], // 为了不把node_modules目录下的第三方模块打包进输出文件中,因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
  module: {
    parser: {
      javascript: {
        importMeta: false,
      },
    },
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    //   ignoreOrder: false
    // }),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, optimizationConfig, ssrConfig);
export default webpackConfig;
