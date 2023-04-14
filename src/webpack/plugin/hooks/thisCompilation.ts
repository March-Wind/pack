import webpack, { Compiler, WebpackPluginInstance, Chunk, Compilation, AssetInfo, Asset } from 'webpack'
import {format} from '../../tool/formatDate'
import { RawSource } from 'webpack-sources'

class IMake implements WebpackPluginInstance {

  apply(compiler: webpack.Compiler){
    //只要有返回值就不执行后面的hooks
    debugger
    // compiler.hooks.entryOption.tap("entryOption周期", (str,entryNormalized) => {
    //   debugger
    //   console.log(str,entryNormalized)
    //   return true
    //   // return new Promise((resolve,reject) => {
    //   //   compilation.hooks.addEntry.tap("看看入口选项", (dependency, entryOptions) => {
    //   //     debugger
    //   //     console.log(dependency);
    //   //     console.log(entryOptions);
    //   //     resolve()
    //   //   })
    //   // })
    // })
    const createTime = (new Date()).getTime();
    const notesTime = `\n<!-- ${format(createTime,'YYYY-MM-DD hh:mm:ss')} -->`;
    compiler.hooks.thisCompilation.tap("thisCompilation", (compilation) => {
      compilation.hooks.processAssets.tapAsync( {
        name: 'processAssets',
        stage:
        /**
         * Generate the html after minification and dev tooling is done
         */
        // webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE, // 本身资产，不包括html等加入的资产
        webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE, // 最终所有资产
      },(compilationAssets,cb) => {
        debugger
        const keys = Object.keys(compilationAssets).filter((name) => {
          if(/.html$/.test(name)){
            return true;
          }
        }) 
        keys.forEach((key) => {
          const content = compilationAssets[key].source();
          const source = content + notesTime;
          compilationAssets[key] = new RawSource(source)
        })
        cb();
      })
      // const keys = Object.keys(compilation.assets).filter((name) => {
    //   if(/.html$/.test(name)){
    //     return true;
    //   }
    //  }) 
    //  keys.forEach((key) => {
    //   const content = compilation.assets[key].source();
    //   const source = notesTime + content;
    //   compilation.assets[key] = new RawSource(source)
    //  })
    })
  }
}
export default IMake;