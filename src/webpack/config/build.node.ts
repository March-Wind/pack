import webpack from 'webpack';
import path from 'path';
import { merge, mergeWithRules } from 'webpack-merge';
import webpackBaseConfig from './base/base';
import webpackModuleConfig from './base/module';
import { defaultOutput } from './contant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
import optimizationConfig from './base/optimization';
import ModTiktokenEntry from '../plugin/resolve.plugin/modTiktokenEntry';
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
    // 跟@dqbd/tiktoken有关, webpack 会引用@dqbd/tiktoken的cjs文件，cjs文件中使用的fs.readSyne来读取的wasm文件，导致webpack无法打包进来wasm文件，所以要指明import来加载esm文件
    // 目前去掉conditionNames，使用ModTiktokenEntry来实现修改导入esm文件。
    // conditionNames: ['import', 'require'],
    // 针对mongoose引用bson的fix，bug:https://github.com/mongodb/js-bson/pull/564/files
    // MongoDB 的 bson 解析器在 ESM 模式下使用顶级等待和动态导入来避免一些 Webpack 捆绑问题。Next.js 强制使用 ESM 模式。本项目也强制使用了ESM
    fallback: { crypto: false },
    plugins: [new ModTiktokenEntry()],
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
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, optimizationConfig, ssrConfig);
export default webpackConfig;
