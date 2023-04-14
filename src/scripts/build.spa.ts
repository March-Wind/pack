process.env.NODE_ENV = 'production';
import './initConfig'
import fs from 'fs';
import webpack from 'webpack';
import config from '../webpack/config/build.spa';
import chalk from 'chalk'
webpack(config, (err, stats) => {
  // debugger
  if (err) {
    console.error(JSON.stringify(err.stack) || JSON.stringify(err));
    return;
  }
  if (stats) {
    const info = stats.toJson();
    fs.writeFileSync('./stats.json', JSON.stringify(info)) //分析网站：http://webpack.github.io/analyse/
    if (stats.hasErrors()) {
      info.errors?.forEach((error) => {
        console.log(chalk.red(error.message));
      })
    }
  }
});
