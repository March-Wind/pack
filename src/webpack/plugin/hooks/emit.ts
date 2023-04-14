import webpack, { Compiler, WebpackPluginInstance, Chunk, Compilation, AssetInfo, Asset } from 'webpack'
import {format} from '../../tool/formatDate'
import { RawSource } from 'webpack-sources'

class IMake implements WebpackPluginInstance {

  apply(compiler: webpack.Compiler){
    debugger
    // const createTime = (new Date()).getTime();
    // const notesTime = `<!-- ${format(createTime,'YYYY-MM-DD hh:mm:ss')} -->`;
    // compiler.hooks.emit.tapAsync("IMake", (compilation, cb) => {
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
    //  cb()
    // })
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    compiler.hooks.emit.tap('Analyze',(compilation) => {
      
    })
  }
}
export default IMake;