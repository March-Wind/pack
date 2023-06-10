import webpack from 'webpack';
import path from 'path';
import { merge, mergeWithRules } from 'webpack-merge';
import webpackBaseConfig from './base/base';
import webpackModuleConfig from './base/module';
import optimizationConfig from './base/optimization';

import { defaultOutput } from './contant';

// import { projectConfig, assetsPublicPath } from '../project.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
// import babelConfig from './base/babel.config';

// https://webpack.docschina.org/plugins/mini-css-extract-plugin/
const config = global.project_config;
const { assetsPublicPath } = config;

const ssrConfig: webpack.Configuration = {
  // entry: {
  //     routes: './src/ssrRoutes.tsx',
  //     store: './src/store/index.ts'
  // },
  entry: config.entry,
  devtool: 'source-map',
  // mode: 'production',
  // mode: 'development',
  target: 'node',
  output: {
    filename: '[name].js',
    // path: path.resolve(process.cwd(), `h5-pack/ssr/${config.name}`),
    path: defaultOutput,
    // libraryTarget: "umd",
    // globalObject: "this",
    library: {
      name: '[name]',
      type: 'commonjs',
      // export: 'default',
    },
    clean: true,
  },
  externals: [nodeExternals()], // 为了不把node_modules目录下的第三方模块打包进输出文件中,因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
  // optimization: {
  //     splitChunks: {
  //         cacheGroups: {
  //             styles: {
  //                 name: "styles",
  //                 type: "css/mini-extract",
  //                 chunks: "all",
  //                 enforce: true,
  //             },
  //         },
  //     },
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: false,
    }),
  ],
};

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, optimizationConfig, ssrConfig);
delete webpackConfig.optimization;
delete webpackConfig.performance;
// // 合并rules 主要是合并js/jsx、ts/tsx语言的编译
//  webpackConfig = mergeWithRules({
//     module: {
//         rules: {
//             test: "match",
//             use: {
//                 loader: "match",
//                 options: "replace",
//             },
//         },
//     },
// })(ssrConfig, optimizationConfig)
// debugger
export default webpackConfig;
