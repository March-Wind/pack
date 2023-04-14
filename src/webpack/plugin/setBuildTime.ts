import webpack, { Compiler, WebpackPluginInstance, Chunk, Compilation, AssetInfo, Asset } from 'webpack'
import { format } from '../../tool/formatDate'
import pkg from 'webpack-sources';
const { RawSource } = pkg;
/**
 * 给html的最后增加打包时间注释
 */
class SetBuildTime implements WebpackPluginInstance {

  apply(compiler: webpack.Compiler) {
    const createTime = (new Date()).getTime();
    const notesTime = `\n<!-- ${format(createTime, 'YYYY-MM-DD hh:mm:ss')} -->`;
    compiler.hooks.thisCompilation.tap("thisCompilation", (compilation) => {
      compilation.hooks.processAssets.tapAsync({
        name: 'processAssets',
        stage:
          /**
           * Generate the html after minification and dev tooling is done
           */
          // webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE, // 本身资产，不包括html等加入的资产
          webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE, // 最终所有资产
      }, (compilationAssets, cb) => {
        const keys = Object.keys(compilationAssets).filter((name) => {
          if (/.html$/.test(name)) {
            return true;
          }
        })
        keys.forEach((key) => {
          const content = compilationAssets[key].source();
          const source = content + notesTime;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          compilationAssets[key] = new RawSource(source)
        })
        cb();
      })
    })
  }
}
export default SetBuildTime;
