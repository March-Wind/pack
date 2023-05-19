import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
// import { requirePackage } from '../../utils';
import { createEnvironmentHash } from '../../utils';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import babelConfig from './babel.config';
const config = global.project_config;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
// import DllReferencePlugin from 'webpack/lib/DllReferencePlugin'
// import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
// const smp = new SpeedMeasurePlugin();

const isDev = process.env.NODE_ENV === 'development';

// let cache: webpack.Configuration['cache'] = {
//   type: 'filesystem',
//   // cacheDirectory: "node_modules/.cache/webpack", // 默认就是这个
// };
// if (isDev) {
//   cache = {
//     type: 'memory',
//   };
// }

// const isAnalyzer: webpack.Configuration = {
//     stats: 'normal', // Node APi 第二个参数是stats,可以直接输出stats.json文件用来分析：分析网站：http://webpack.github.io/analyse/
//     profile: true, // 在stats.json增加每个module编译时间
//     plugins: [
//         // 打包体积分析
//         new BundleAnalyzerPlugin()
//     ]
// }

const optimizationConfig: webpack.Configuration = {
  // mode: 'production',  // 自动进行tree shaking

  resolve: {
    alias: {
      // 转化成绝对路经，减少查找
      ...config.alias,
    },
  },
  // cache, // 持久化缓存
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash({ mode: process.env.MODE }),
    cacheDirectory: resolveApp('node_modules/.cache'),
    store: 'pack',
    // buildDependencies: {
    //   defaultWebpack: ['webpack/lib/'],
    //   config: [__filename],
    //   tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f =>
    //     fs.existsSync(f)
    //   ),
    // },
  },
  optimization: {
    // 手动开始tree shaking, 当mode: 'production'，默认进行tree shaking
    // usedExports: true, // 开启优化（树摇但保留代码）
    // minimize: true, // 开启压缩 (删除未使用代码)
  },
  // module: {
  //     rules: [
  //         {
  //             oneOf:[
  //                 {
  //                     test: /\.(js|ts|jsx|tsx)$/,
  //                     exclude: /node_modules/,
  //                     use: [
  //                         requirePackage("thread-loader"), // 开启多线程
  //                         // "thread-loader",
  //                         {
  //                             loader: requirePackage("babel-loader"),
  //                             options:
  //                             {
  //                                 cacheDirectory: true, // 在dev开发环境开始缓存
  //                                 cacheCompression: false,
  //                                 ...babelConfig
  //                             }
  //                         }]
  //                 },
  //             ]
  //      }
  //     ]
  // },
  plugins: [
    // dll方案被webpack5持久化缓存替代掉了
    // 告诉webpack使用了哪些动态链接库
    // new DllReferencePlugin({
    //     manifest: require(path.resolve(process.cwd(), 'dll/react.manifest.json'))
    // }),
  ],
};

// const addOptimizationConfig = (webpackConfig: webpack.Configuration) => {
//   webpackConfig.module.rules[0]
//   debugger
// }
// export {
//   addOptimizationConfig
// }

export default optimizationConfig;
