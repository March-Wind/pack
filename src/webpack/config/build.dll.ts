/**
 * dll方案被webpack 5 持久化方案替代掉 webpack config中的cache对象
 */
import path from 'path'
import webpack from 'webpack';
import { defaultOutput } from './contant'
import DllPlugin from 'webpack/lib/DllPlugin'
// const config = global.project_config;
const dllConfig: webpack.Configuration = {
  mode: 'production',
  entry: {
    // 将React相关模块放入一个动态链接库
    react: ['react', "react-dom", 'redux', 'react-redux', "@reduxjs/toolkit", 'react-router', "react-router-dom"],
    // librarys: ['wangeditor'],
    // utils: ['axios', 'js-cookie']
  },
  output: {
    filename: '[name]-dll.js',
    // path: path.resolve(process.cwd(), 'h5-pack/dll'),
    path: defaultOutput,
    // 存放动态链接库的全局变量名，加上_dll_防止全局变量冲突
    library: '_dll_[name]'
  },
  // 动态链接库的全局变量名称，需要可output.library中保持一致，也是输出的manifest.json文件中name的字段值
  // 如react.manifest.json字段中存在"name":"_dll_react"
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(process.cwd(), 'dll', '[name].manifest.json')
    })
  ]
}

export default dllConfig;
