// process.env.NODE_ENV = 'production'
// import './initConfig'
// import webpack from 'webpack';
// import config from '../webpack/config/build.dll';
// const chalk = require('chalk');
// process.env.NODE_ENV = 'production';

// webpack(config, (err, stats) => {
//   if (err) {
//     console.error(JSON.stringify(err.stack) || JSON.stringify(err));
//     return;
//   }
//   if (stats) {
//     const info = stats.toJson();
//     // fs.writeFileSync('./stats.json', JSON.stringify(info)) //分析网站：http://webpack.github.io/analyse/
//     if (stats.hasErrors()) {
//       info.errors?.forEach((error) => {
//         console.log(chalk.red(error.message));
//       })
//     }
//   }
// });
