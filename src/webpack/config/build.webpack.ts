import webpack from 'webpack';
import path from 'path';
import babelConfig from './base/babel.config';
const webacpkConfog: webpack.Configuration = {
  entry: './scripts/build.webpack.ts',
  output: {
    path: path.resolve(process.cwd(), `webpackBuild`),
  },
  target: 'node',
  performance: {
    // 新增性能优化
    maxEntrypointSize: 3072000, // 入口文件大小，推荐244k
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
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelConfig,
            },
          },
        ],
      },
    ],
  },
};

// export default merge(webacpkConfog, debugConfog)
export default webacpkConfog;
