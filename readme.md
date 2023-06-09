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

## Support

1. Support `dotenv` and differentiate between environments, using ` --DOT_ENV=test` will load the `. env. test` file

## Notes:

1. The entry file names are case-sensitive, otherwise hot reloading will not work in development mode.
