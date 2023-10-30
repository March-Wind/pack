1.  environment[SyncHook]：读取配置文件之后，初始化内部插件之前。
2.  afterEnvironment[SyncHook]：当编译器环境设置完成后，在 environment hook 后直接调用。
3.  entryOption[SyncBailHook]：在 webpack 选项中的 entry 被处理过之后调用。
4.  afterPlugins[SyncHook]：在初始化内部插件集合完成设置之后调用。
5.  afterResolvers[SyncHook]：resolver 设置完成之后触发。
    > enhanced-resolve 库创建的 resolver.
6.  initialize[SyncHook]：当编译器对象([Compilation](https://webpack.js.org/api/compilation-object/#compilation-object-methods))被初始化时调用。
7.  beforeRun[AsyncSeriesHook]：在开始执行一次构建之前调用，compiler.run 方法开始执行后立刻进行调用。
8.  run[AsyncSeriesHook]：在开始读取 records 之前调用。
9.  watchRun[AsyncSeriesHook]：在监听模式下，一个新的 compilation 触发之后，但在 compilation 实际开始之前执行。
10. normalModuleFactory[SyncHook]：NormalModuleFactory 创建之后调用。
    > 创建 NormalModule 实例的工厂函数。NormalModule 实例代表着一个模块，它是 webpack 构建过程中的基本单元。NormalModule 实例包含了模块的依赖关系、源代码、解析后的 AST 等信息。
11. ContextModuleFactory[SyncHook]：ContextModuleFactory 创建之后调用。
    > 使用 ​ ContextModuleFactory ​ 模块从 webpack 独特的 require.context API 生成依赖关系。 它会解析请求的目录，为每个文件生成请求，并依据传递来的 regExp 进行过滤。 最后匹配成功的依赖关系将被传入 NormalModuleFactory。
12. beforeCompile[AsyncSeriesHook]：在创建 compilation parameter 之后执行。此钩子可用于添加/修改 compilation parameter。

    > 初始化 compilationParams 变量的示例如下：

        ```
        compilationParams = {
          normalModuleFactory,
          contextModuleFactory,
        };
        ```

    > 例子：

        ```
        compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
          params['MyPlugin - data'] = 'important stuff my plugin will use later';
          callback();
        });
        ```

13. compile[SyncHook]：beforeCompile 之后立即调用，但在一个新的 compilation 创建之前。这个钩子 不会 被复制到子编译器。
14. thisCompilation[SyncHook]：初始化 compilation 时调用，在触发 compilation 事件之前调用。这个钩子 不会 被复制到子编译器。
15. compilation[SyncHook]：compilation 创建之后执行。
16. make[AsyncParallelHook]：compilation 结束之前执行。这个钩子 不会 被复制到子编译器。
17. afterCompile[AsyncSeriesHook]：compilation 结束和封印之后执行。
18. shouldEmit[SyncBailHook]：在输出 asset 之前调用。返回一个布尔值，告知是否输出。
19. emit[AsyncSeriesHook]：输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。
20. afterEmit[AsyncSeriesHook]：输出 asset 到 output 目录之后执行。这个钩子 不会 被复制到子编译器。
21. assetEmitted[AsyncSeriesHook]：在 asset 被输出时执行。此钩子可以访问被输出的 asset 的相关信息，例如它的输出路径和字节内容。
22. done[AsyncSeriesHook]：在 compilation 完成时执行。这个钩子 不会 被复制到子编译器。
23. additionalPass[AsyncSeriesHook]： 允许你，额外一次构建。
24. failed[SyncHook]：在 compilation 失败时调用。
25. invalid[SyncHook]： 在一个观察中的 compilation 无效时执行。这个钩子 不会 被复制到子编译器。
26. watchClose[SyncHook]：在一个观察中的 compilation 停止时执行。
27. shutdown[AsyncSeriesHook]：当编译器关闭时调用。
28. infrastructureLog[SyncBailHook]:在配置中启用 infrastructureLogging 选项 后，允许使用 infrastructure log(基础日志)。
29. log[SyncBailHook]：启用后允许记录到 stats 对象，请参阅 stats.logging, stats.loggingDebug 和 stats.loggingTrace 选项。

### Webpack records

是一种用于生成长期缓存的文件名的技术。使用 Webpack records 可以重复使用元数据，包括模块/块信息，以在连续构建之间生成更持久的文件名。这意味着随着每次构建的运行，模块不会经常重新排序并移动到另一个块中，从而减少了缓存破坏 1。
