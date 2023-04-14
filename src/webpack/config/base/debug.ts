import webpack from 'webpack';
import { resolve } from 'path';
const debugConfog: webpack.Configuration = {
  profile: true,
  stats: {
    builtAt: true
  },
  cache: false,
  resolveLoader: {
    // modules: [resolve(__dirname, '../../../node_modules')],
    modules: [process.env.NODE_MODULES_PATH],

  }
};
export default debugConfog;
