import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//解决作为npm包时，产生的依赖包安装位置不同的问题，这是npm的包依赖管理机制导致的。
const requirePackage = (packageName: string) => {
  debugger
  let content = null;
  try {
    // content = require(path.resolve(__dirname, `../node_modules/${packageName}`));
    content = require(path.resolve(process.env.NODE_MODULES_PATH, `./${packageName}`));
    console.log(88, path.resolve(process.env.NODE_MODULES_PATH, `./${packageName}`))

  } catch (err) {
    content = packageName;
  }
  return content;
}
export {
  requirePackage
}
