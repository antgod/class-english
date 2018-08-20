const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const md5 = require('js-md5');
const { appKey, key, apiPath } = require('./constant')

const keys = Object.keys

function mkdir(dirname = './', options = {}) {  
  if (!fs.existsSync(dirname)) {
    let { cwd = process.cwd() } = options  
    let rel = path.normalize(path.relative(cwd, path.resolve(cwd, dirname))) 
    let paths = rel.split(/[\/\\\\]/)  
    paths.reduce((base, el) => {  
      let curPath = path.join(base, el)  
      if (!fs.existsSync(curPath)) {  
        fs.mkdirSync(curPath)  
      }  
      return curPath  
    }, cwd)  
  }
}  

const statistics = () => {
  const all = {}
  return {
    collect: (words) => {
      return words.forEach(word => {
        all[word] = ++all[word] || 1
      })
    },
    result: all,
  }
}

const createQuery = (search) => {
  const salt = Math.round(Math.random() * 10);
  const query = {
    from: 'auto',
    to: 'auto',
    q: encodeURIComponent(search),
    appKey,
    salt,
    sign: md5(`${appKey}${search}${salt}${key}`)
  }
  return `${apiPath}?${keys(query).map((key) => `${key}=${query[key]}`).join('&')}`
}

const log = console.log
const info = chalk.green
const warn = chalk.yellow
const error = chalk.red

module.exports = {
  mkdir, 
  statistics,
  createQuery,
  log,
  info,
  warn,
  error,
}