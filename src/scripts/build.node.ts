process.env.NODE_ENV = 'production';
import './initConfig';
import webpack from 'webpack';
import config from '../webpack/config/build.node';
import chalk from 'chalk';
// process.env.AUTOPREFIXER = 'production';

webpack(config, (err, stats) => {
  if (err) {
    console.error(JSON.stringify(err.stack) || JSON.stringify(err));
    return;
  }
  if (stats) {
    const info = stats.toJson();
    if (stats.hasErrors()) {
      info.errors?.forEach((error) => {
        console.log(chalk.red(error.message));
      });
    }
  }
});
