#! /usr/bin/env node
// process.env.NODE_ENV = 'development';
import './initConfig';
import webpack from 'webpack';
import config from '../webpack/config/dev';
// const chalk = require('chalk');
import webpackServer, { Configuration } from 'webpack-dev-server';
// process.env.AUTOPREFIXER = 'production';
// process.env.BROWSERSLIST_ENV = 'development';
// process.env.AUTOPREFIXER = 'production';
const compiler = webpack(config);
const server = new webpackServer(config.devServer as Configuration, compiler);
server
  .start()
  .then((res) => {
    // to practice dev:web模式下的终端有很多输出时不时因为这里
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
