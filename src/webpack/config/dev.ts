import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import webpackBaseConfig from './base/base';
import webpackModuleConfig from './base/module';
import optimizationConfig from './base/optimization';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import setRemScript from '../plugin/setRemCode';
import { Configuration } from 'webpack-dev-server';
import { defaultOutput } from './contant';
const config = global.project_config;
const devConfig: webpack.Configuration & Configuration = {
  // entry: './src/index.tsx',
  entry: config.entry,
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(process.cwd(), defaultOutput), // /${projectConfig.name}
  },
  devServer: {
    // 安装@types/webpack-dev-server
    host: '127.0.0.1',
    port: 4000,
    open: true, // 自动拉起浏览器
    hot: true, // 热加载
    liveReload: true, // 检测到文件更改，刷新页面、
    // watchContentBase: true, // 监听contentBase
    compress: true, // 启动gzip
    // historyApiFallback: true,// 所有失败的路径都执行index.html
    historyApiFallback: {
      disableDotRule: true,
    },
    // stats:{
    //   colors:true
    // }
    client: {
      overlay: {
        // 覆盖页面错误
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      title: 'template',
      filename: 'index.html',
      template: `./index.html`,
      // minify: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        'theme-color': '#4285f4',
        // Will generate: <meta name="theme-color" content="#4285f4">
      },
      setRemScript,
    }),
  ],
};

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, devConfig, optimizationConfig);

export default webpackConfig;
