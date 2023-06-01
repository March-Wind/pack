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
    path: defaultOutput, // /${projectConfig.name}
    // publicPath: '/pack'
  },
  target: 'web',

  devServer: {
    // 安装@types/webpack-dev-server
    host: '127.0.0.1',
    bonjour: true,
    port: 4000,
    open: true, // 自动拉起浏览器
    hot: true, // 热加载
    liveReload: true, // 检测到文件更改，刷新页面、
    // watchContentBase: true, // 监听contentBase
    compress: true, // 启动gzip
    // historyApiFallback: true,// 所有失败的路径都执行index.html
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        poll: true,
      },
    },

    // aggregateTimeout:100,

    headers: {
      'Cache-Control': 'no-store',
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    // stats:{
    //   colors:true
    // }
    client: {
      progress: true,
      overlay: {
        // 覆盖页面错误
        errors: true,
        warnings: false,
      },
    },
    // static: {
    //   directory: path.join(process.cwd(), 'src'),
    //   watch: true,
    // },
  },
  // 如果在这个时间内没有再次修改文件，webpack-dev-server 就会认为这个文件已经更新完毕
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 0,
  //   // poll: 1000,
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      title: config.title || '',
      filename: 'index.html',
      template: `./index.html`,
      // minify: true,
      cache: false,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        'theme-color': '#4285f4',
        // Will generate: <meta name="theme-color" content="#4285f4">
      },
      // setRemScript,
    }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser.js',
    // }),
  ],
};

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, devConfig, optimizationConfig);
// const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, devConfig);
export default webpackConfig;
