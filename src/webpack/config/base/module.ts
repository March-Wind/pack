import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import babelConfig from './babel.config';
import postcssNormalize from 'postcss-normalize';
import postcss_flexbugs_fixes from 'postcss-flexbugs-fixes';
import postcss_preset_env from 'postcss-preset-env';

const config = global.project_config;
const { remotePublic, inlineStyle = false } = config;
let styleLoader;
switch (process.env.MODE) {
  // case 'ssr':
  //     styleLoader = 'isomorphic-style-loader';
  //     break;
  case 'dev_web':
    styleLoader = 'style-loader';
    break;
  default:
    styleLoader = {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../', // 这个是给css里面的图片等url使用的
      },
    };
    break;
}

const iModule: webpack.Configuration = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // cacheDirectory: process.env.NODE_ENV === 'development', // 在dev开发环境开始缓存
                  ...babelConfig,
                },
              },
            ],
          },
          {
            test: /\.(css)$/,
            exclude: [/\.module\.(css)$/],
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                // loader: 'fast-css-loader',
                options: {
                  // url: false
                  // name: 'css/[name].[contenthash].css'
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      // require('postcss-flexbugs-fixes'),
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // require('postcss-preset-env')({
                      //   autoprefixer: {
                      //     flexbox: 'no-2009',
                      //   },
                      //   stage: 3,
                      // }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.module\.(css)$/,
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                // loader: 'fast-css-loader',
                options: {
                  // modules: true,
                  // url: false,
                  importLoaders: 1,
                  modules: {
                    mode: 'local',
                    localIdentName: '[local]___[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.(less)$/,
            exclude: [/\.module\.(less)$/],
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                options: {
                  // url: false
                  // name: 'css/[name].[contenthash].css'
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
              {
                loader: 'less-loader',
              },
            ],
          },
          {
            test: /\.module\.(less)$/,
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                options: {
                  // modules: true,
                  importLoaders: 1,
                  modules: {
                    mode: 'local',
                    localIdentName: '[local]___[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      // require('postcss-flexbugs-fixes'),
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // require('postcss-preset-env')({
                      //     autoprefixer: {
                      //         flexbox: 'no-2009',
                      //     },
                      //     stage: 3,
                      // }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
              {
                loader: 'less-loader',
              },
            ],
          },
          {
            test: /\.(scss|sass)$/,
            exclude: [/\.module\.(scss|sass)$/],
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                // loader: 'fast-css-loader',

                options: {
                  // url: false
                  // name: 'css/[name].[contenthash].css'
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
              {
                loader: 'sass-loader',
                // loader: 'fast-sass-loader',
              },
            ],
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                // loader: 'fast-css-loader',
                options: {
                  // modules: true,
                  importLoaders: 1,
                  modules: {
                    mode: 'local',
                    localIdentName: '[local]___[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      postcss_flexbugs_fixes,
                      postcss_preset_env({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      // Adds PostCSS Normalize as the reset css with default options,
                      // so that it honors browserslist config in package.json
                      // which in turn let's users customize the target behavior as per their needs.
                      postcssNormalize(),
                    ],
                  },
                },
              },
              {
                loader: 'sass-loader',
                // loader: 'fast-sass-loader',
              },
            ],
          },
          {
            test: /\.svg?$/,
            oneOf: [
              {
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      prettier: false,
                      // svgo: true,
                      svgoConfig: {
                        plugins: [
                          {
                            name: 'preset-default',
                            params: {
                              overrides: {
                                removeViewBox: false,
                              },
                            },
                          },
                        ],
                      },
                      titleProp: true,
                    },
                  },
                ],
                issuer: {
                  and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                },
              },
            ],
          },
          {
            test: /\.(jpg|jpeg|png|gif|webp)$/i,
            // use: [
            //     {
            //         loader: 'url-loader',
            //         options: {
            //             esModule: false,
            //             name: 'images/[name].[ext]',
            //             limit: 100,
            //             publicPath: remotePublic,// 给图片增加服务器路径
            //         }
            //     }
            // ],
            // type: 'javascript/auto'
            type: 'asset/resource',
            generator: {
              filename: 'img/[name]_[hash:5][ext][query]',
              // publicPath: remotePublic // error: invalid url
              ...(remotePublic ? { publicPath: remotePublic } : {}),
            },
          },
          // {
          //   test: /\.(woff|svg|otf|eot|ttf)$/,
          //   // loader: 'url-loader',
          //   // options: {
          //   //     name: 'font/[name].[ext]',
          //   //     publicPath: remotePublic,// 给字体文件增加服务器路径
          //   //     limit: 0,
          //   // }
          //   type: 'asset/resource',
          //   generator: {
          //     filename: 'img/[name]_[hash:5][ext][query]',
          //     // publicPath: remotePublic // error: invalid url
          //     ...(remotePublic ? { publicPath: remotePublic } : {})
          //   }
          // },
        ],
      },
    ],
  },
};

export default iModule;
