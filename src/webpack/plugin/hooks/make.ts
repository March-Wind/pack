import webpack, { Compiler, WebpackPluginInstance, Chunk, Compilation, AssetInfo, Asset } from 'webpack'

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
    compiler.hooks.make.tapAsync("IMake", (compilation, cb) => {
    //   debugger
      compilation.hooks.seal.tap("IMake2", () => {
        // debugger
        console.log('seal')
      })
      // //   return Promise.resolve()
      // debugger
      cb()
    })
  }
}
export default IMake;