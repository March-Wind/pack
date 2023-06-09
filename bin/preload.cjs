// import dotenv from 'dotenv'
const dotenv = require('dotenv');
const path = require('path');
const _path = path.resolve(process.cwd(), `.env.${process.env.DOT_ENV}`)
dotenv.config({ path: _path })
