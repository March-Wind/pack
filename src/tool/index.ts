import { copyFile, copyFileSync, fstat, mkdirSync, readdirSync, readFileSync, statSync } from 'fs';
import util from 'node:util';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
/**
 * 判断是否有文件
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const hasFile = (path: string): boolean => {
  const state = statSync(path);
  return state.isFile();
};
/**
 * 判断是否有文件夹
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const hasDirectory = (path: string): boolean => {
  const state = statSync(path);
  return state.isDirectory();
};

/**
 * 读取文件内容，如果不存在返回undefined
 *
 * @param {string} path
 * @param {Parameters<typeof readFileSync>[1]} options
 * @return {*}
 */
const _readFileSnyc = (path: string, options?: Parameters<typeof readFileSync>[1]) => {
  const existence = hasFile(path);
  if (existence) {
    return readFileSync(path, options);
  }
};

/**
 * 读取js文件内容，不存在的话返回undefined
 *
 * @param {string} path
 * @return {*}
 */
const readJsFileSnyc = (path: string) => {
  let content;
  try {
    content = require(path);
  } catch (error) {
    // console.log(error);
  }
  return content;
};

// 递归copy文件到某个目录下
const fsCopy = (source: string, destination: string) => {
  // 深度优先遍历
  const recursive = (src: string, dest: string) => {
    const files = readdirSync(src);
    for (let i = 0; i < files.length; i++) {
      const _src = src + '/' + files[i];
      const _dest = dest + '/' + files[i];
      if (hasFile(_src)) {
        copyFileSync(_src, _dest);
      }
      if (hasDirectory(_src)) {
        mkdirSync(_dest, { recursive: true });
        recursive(_src, _dest);
      }
    }
  };
  recursive(source, destination);
};

export { hasFile, hasDirectory, _readFileSnyc, readJsFileSnyc, fsCopy };
