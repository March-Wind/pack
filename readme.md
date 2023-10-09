## Introduction:

Supports local development and bundling features for both web and node environments, with typescript support.

## Installation:

`npm i @marchyang/pack`

## Usage:

1.  Configure commands in package.json, assign a value to "mode" to specify the startup model. append -d after debugger @marchyang/pack.

    ```
      "scripts": {
            "dev:web": "pack2 pack2 --mode=dev:web",
            "dev:web:debug": "pack2 pack2 --mode=dev:web -d" ,
      }
    ```

2.  `npm run dev:web`

## Default Configuration for Each Mode

| Mode       | Entry       |
| ---------- | ----------- |
| dev:web    | src/app.tsx |
| build:spa  | src/app.tsx |
| dev:node   | src/app.ts  |
| build:node | src/app.ts  |

3. 在项目根目录增加 pack.config.cjs 可以覆盖默认配置，同时可以设置 config 来指定配置文件路径，同时能覆盖默认配置

   ```
   module.exports = {
      dev_node: {
        entry: './src/app.ts',
      },
      build_node: {
        entry: './src/app.ts',
      },
   };
   ```

## Support

1. Support `dotenv` and differentiate between environments, using ` --DOT_ENV=test` will load the `. env. test` file

## Notes:

1. The entry file names are case-sensitive, otherwise hot reloading will not work in development mode.(文件名字大小写影响 web-dev-server 热更新)
2. 本地开发时(作为 link 包)，dev:node 时要在项目内增加 tsconfig.json，使用的是项目内的 tsconfig.json
