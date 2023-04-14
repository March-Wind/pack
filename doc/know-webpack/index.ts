// 1. 打包后的结构
(function () { // 自执行函数
  const __webpack_modules__ = { // webpack 同步的模块列表
    // key 是路经, value是有webpack参数的函数，函数里面是业务编译后的源码
    "../h5-pack/node_modules/core-js/internals/a-callable.js": ((module, __unused_webpack_exports, __webpack_require__) => {// 第一个参数可能 module 或者 __unused_webpack_module，module是已经加载的，__unused_webpack_module是还没加载的
      /** ....编译后的源码 */
    })
  }
  // 已经韩村过的 module
  const __webpack_module_cache__ = {};


  // 加载module函数
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    const cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    const module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // Execute the module function
    // 调用该模块的代码，把模块信息收集在module对象上，包括exports出来的变量等。同时也会给被调用模块webpack的所有信息和功能函数，主要是通过__webpack_require__传递
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  // 把webpack信息挂在__webpack_require__上，通过传递__webpack_require__变量给各个模块，让单个模块能够访问到全局的webpack信息
  __webpack_require__.m = __webpack_modules__;








  {
    /********** 给是__esModule的module返回module。deafult, 不是的返回整个module  --start **********************************************************************************/

    /* webpack/runtime/compat get default export */
    (() => {
      // getDefaultExport function for compatibility with non-harmony modules
      __webpack_require__.n = (module) => {
        const getter = module && module.__esModule ?
          () => (module['default']) :
          () => (module);
        __webpack_require__.d(getter, { a: getter });
        return getter;
      };
    })();

    /* webpack/runtime/define property getters */
    // 主要是通过修改exports的getter函数来实现，获取exports时兼容不同规范的模块。
    (() => {
      // define getter functions for harmony exports
      __webpack_require__.d = (exports, definition) => {
        for (const key in definition) {
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          }
        }
      };
    })();

    /* webpack/runtime/hasOwnProperty shorthand */
    (() => {
      __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    })();
    /********** 给是__esModule的module返回module。deafult, 不是的返回整个module  --end **********************************************************************************/
  }





  {
    /********* 加载模块 --start *******************************************************************************/

    /* webpack/runtime/publicPath */
    // 公共路经
    (() => {
      __webpack_require__.p = "";
    })();


    /* webpack/runtime/ensure chunk */
    (() => {
      __webpack_require__.f = {};
      // This file contains only the entry chunk.
      // The chunk loading function for additional chunks
      __webpack_require__.e = (chunkId) => {
        return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises);
          return promises;
        }, []));
      };
    })();
  }














  /******/ 	/* webpack/runtime/get javascript chunk filename */
  /******/ 	(() => {
    /******/ 		// This function allow to reference async chunks
    /******/ 		__webpack_require__.u = (chunkId) => {
      /******/ 			// return url for filenames based on template
      /******/ 			return "" + chunkId + ".js";
      /******/
    };
    /******/
  })();





  /******/ 	/* webpack/runtime/get mini-css chunk filename */
  /******/ 	(() => {
    /******/ 		// This function allow to reference async chunks
    /******/ 		__webpack_require__.miniCssF = (chunkId) => {
      /******/ 			// return url for filenames based on template
      /******/ 			return "css/" + chunkId + ".css";
      /******/
    };
    /******/
  })();





  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
      /******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();




})()
