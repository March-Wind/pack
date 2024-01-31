import webpack from 'webpack';
import path from 'path';
import { merge, mergeWithRules, customizeArray } from 'webpack-merge';
import webpackBaseConfig from './base/base';
import webpackModuleConfig from './base/module';
import optimizationConfig from './base/optimization';
import { defaultOutput } from './contant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import setRemScript from '../plugin/setRemCode';
import Manifest from '../plugin/webpack-manifest-plugin';
// import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import debugConfig from './base/debug';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin';
// const smp = new SpeedMeasurePlugin();
// import { resolve } from 'path/posix';
// debugger
const config = global.project_config;
const { remotePublic } = config;
const spaConfig: webpack.Configuration = {
  entry: config.entry,
  mode: 'production',
  devtool: 'source-map',
  // devtool: false,
  output: {
    filename: '[name].[contenthash].js',
    // path: path.resolve(process.cwd(), `pack/spa/${config.name}`),
    path: defaultOutput,
    chunkFilename: '[name].[contenthash].js',
    // importFunctionName: '__import__',
    clean: true,
    publicPath: remotePublic || '',
  },
  optimization: {
    // chunkIds: "named", // 按照路经命名，用于调试模式
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    runtimeChunk: 'single', // 运行时需要的代码单独抽离到一个文件
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 2020,
          },
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      // chunks: 'all',
      // chunks: (chunk) => {
      //     console.log(chunk.name);
      //     return true
      // },
      // 默认值
      minSize: 1024 * 50, // 分割代码最小的大小
      // minRemainingSize: 500, // 类似于minsize,最后确保提取文件的文件打下不能小于0
      // minChunks: 2, // 至少被引用的此时，满足条件的才回去代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量,如果超出会合并到其他文件中保证不超过30个,拆分文件的好处是浏览器并行加载，但是过多也不好,所以尽量保证30个。
      // maxInitialRequests: 30, // 入口文件最大并行加载请求数是30
      // enforceSizeThreshold: 500000, // 超过50kb一定会单独打包(此时会忽略minRemainingSize，maxAsyncRequests，maxInitialRequests)
      // cacheGroups:{ // 组，哪些模块打包到一个组
      //     defaultVenfors:{ // 组名
      //         test: /[\\/node_modules[\\/]]/, // 需要打包到一起的模块
      //         priority: -10, // 权重(越大越高)
      //         reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中拆分出的模块，则它江北重用，而不是生成新的模块。
      //     },
      //     default:{// 组的默认值，会覆盖上面的公共默认值配置，
      //         minChunks:2,
      //         priority: -20,
      //         reuseExistingChunk:true
      //     }
      // }
      // minSize: 0,
      cacheGroups: {
        chat: {
          test: /[\\/]src[\\/]pages[\\/]chat[\\/]index/,
          priority: 40,
          name: 'chat',
          chunks: 'all',
          // enforce: true,
          maxSize: 1024 * 200,
        },
        reactBundle: {
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|\@reduxjs\/toolkit|react-router|react-router-dom)[\\/]/,
          name: 'react-bundle',
          chunks: 'all',
          priority: 30,
          maxSize: Infinity,
        },
        otherVendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'other-vender',
          priority: 20, //檔案的優先順序，數字越大表示優先級越高
          maxSize: 1024 * 200,
        },
        // commons: {
        //   test: /src\/common\//,
        //   name: 'commons', //分割出來的檔案命名
        //   // minChunks: 2, //被引入2次以上的code就會被提取出來
        //   priority: 20, //檔案的優先順序，數字越大表示優先級越高
        //   // minChunks: 2,
        //   // minSize: 0,
        //   // minChunks: 0,
        //   reuseExistingChunk: true,
        // },
        default: false,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      title: config.title || '',
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
    // new BundleAnalyzerPlugin()
    // new Manifest({
    //     generate: (seed, files, entries) => {
    //         return entries['main']
    //     }
    // })
  ],
};
// );

const webpackConfig = merge(webpackBaseConfig, webpackModuleConfig, spaConfig, debugConfig, optimizationConfig);
// // 合并rules 主要是合并js/jsx、ts/tsx语言的编译
// webpackConfig = mergeWithRules({
//     module: {
//         rules: {
//             oneOf:  {
//                 test: "match",
//                 use: 'replace'
//             }
//         },
//     },
// })(webpackConfig, optimizationConfig)
// // export default smp.wrap(webpackConfig);
export default webpackConfig;
