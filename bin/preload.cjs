// import dotenv from 'dotenv'
const dotenv = require('dotenv');
const path = require('path');
const _path = process.env.DOT_ENV ? path.resolve(process.cwd(), `.env.${process.env.DOT_ENV}`) : undefined;
dotenv.config({ path: _path })
