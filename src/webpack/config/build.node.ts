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
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
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
