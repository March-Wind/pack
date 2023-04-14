## webpack概念理解
### compiler
  - #### 概念理解：
    > 是webpack编译管理器，webpack 启动后会创建 compiler 对象，该对象一直存活知道结束退出；
    
    > compiler对象保存着webpack完整的环境配置，它扩展（extends）自 Tapable 类，可以用来注册和调用插件
  - #### 主要属性
    1. ```compiler.options``` 可以访问本次启动webpack时候的所有配置，包括但不仅限于loader,entry,output,plugin
    2. ```compiler.inputFileSystem```和```compiler.outputFileSystem```可以进行文件操作，相当于Node.js的fs
    3. ```compiler.hooks```可以注册tapable的不同种类的Hook,从而在compiler生命周期中植入不同的功能。


### compilation
  - #### 概念理解：
    > 单次编辑过程的管理器，比如 watch = true 时，运行过程中只有一个 compiler 但每次文件变更触发重新编译时，都会创建一个新的 compilation 对象；
    
    > Compilation实例能够访问所有模块和他们的依赖，在compiler.make之后产生的,Compilation的钩子函数要在make以前注册
    
    > 一个compilation对象会对构建依赖图中所有模块，进行编译，在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、分块(chunk)、哈希(hash)和重新创建(restore)。

  - #### 主要属性
    1. ```compilation.modules```可以访问所有模块，打包的每一个文件都是一个模块。
    2. ```compilation.chunks```chunk即使多个modules组成而来的一个代码块。
    3. ```compilation.assets```可以访问本次打包生成所有文件的结果
    4. ```compilation.hooks```可以注册tapable的不同种类Hooks,用于在compilation编译模块阶段增加功能。

### module
  - #### 概念理解
    > 一个文件就是一个模块，一个js是一个模块，一个jpg也是一个模块，一个css也是一个模块
    
    > webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的
### dependence
  - #### 概念理解
    > 依赖对象，webpack 基于该类型记录模块间依赖关系


### chunk
  - #### 概念理解
    > Chunk类上面的两句注释：一个Chunk是一些module的封装单元。Chunk在构建完成就呈现为bundle。
    
    > 编译完成准备输出时，webpack 会将 module 按特定的规则组织成一个一个的 chunk，这些 chunk 某种程度上跟最终输出一一对应
  - #### 差生chunk的三个途径
    1. entry入口
    2. 异步加载代码
    3. code split 产生的代码分割

### esmodule自动树摇


## 打包后的代码格式
