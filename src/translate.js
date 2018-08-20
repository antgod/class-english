const md5 = require('js-md5');
const request = require('request')
const fs = require('fs')
const path = require('path')
const util = require('ant-util')
const chalk = require('chalk')
const json = require('../package.json')
const { appKey, key, apiPath } = require('./common/constant')

const { keys, identity } = util
const { get, gets } = util.plugins.exist

const globalEnv = (env) => {
  const rewrite = env
  global.rewrite = rewrite
}

globalEnv(process.env.NODE_ENV)


const log = console.log
const error = chalk.red
const warn = chalk.yellow
const info = chalk.green

const newLine = '\n'
const ignore = /```([\s\S]*)```|\([^)]*\)|（[^）]*）|[\u4e00-\u9fa5]|[,;，；]|#.*\n/g
const ignoreWord = /^\/$|^$/

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

const translate = (word) => new Promise((res, rej) => {
  request(createQuery(word),  (error, _, body) => {
    if (error) {
      log(error(`查询单词：${word}报错`))
    }
    const result = JSON.parse(body)
    const final = gets(result, {
      trans: [],
      webs: [],
      explains: [],
      sound: '',
      url: '',
    })({
      trans: 'translation',
      webs: 'web',
      explains: 'basic.explains',
      sound: 'basic.phonetic',
      url: 'webdict'
    })
    res(final)
  })
})

const templates = (index, word, sound, trans, explains, url, count) => {
  const finalExplains = explains.filter(identity)
  const finalUrl = false ? `\n    ${url.url}` : ''
  const ex = finalExplains.length ? `\n    - ${finalExplains.join('\n    - ')}` : ''
  const r =  `${index}. ${word}${sound} : ${trans.join(' ')} (${count}次)${finalUrl}${ex}\n`
  return r
}

const analysisWords = (line) => {
  return line.split(' ').filter(word => !ignoreWord.test(word))
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

const sta = statistics()

function mkdir(dirname = './', options = {}) {  
  let { cwd = process.cwd() } = options;  
  let rel = path.normalize(path.relative(cwd, path.resolve(cwd, dirname))); //此处可去掉relative，只保留绝对路径，一般情况创建相对目录较多  
  let paths = rel.split(/[\/\\\\]/);  
  paths.reduce((base, el) => {  
    let curPath = path.join(base, el);  
    if (!fs.existsSync(curPath)) {  
      fs.mkdirSync(curPath);  
    }  
    return curPath;  
  }, cwd);  
  return dirname;  
}  

// 读取、翻译以及生成翻译文件
const translateFile = async (src, target, targetSource, genTotal) => {
  const fileExisted = fs.existsSync(src)

  // 处理文件夹
  if (fs.existsSync(target)) {
    if (!rewrite && !genTotal) {
      log(warn(`${target}-文件已存在`))
      return
    } else if(rewrite && !genTotal) {
      log(info(`${target}-文件重新生成`))
    }
  } else {
    const targetPath = target.split('/').reverse().slice(1).reverse().join('/')
    if (!fs.existsSync(targetPath)) {
      mkdir(targetPath, { cwd: targetSource })
    }  
  }

  const handleFile = (read) => async (src, target) => {
    const lines = read(src).toString().replace(ignore, '').split('\n')
    const words = lines.reduce((words, line) => words.concat(analysisWords(line)), [])
    sta.collect(words)

    if (!genTotal) {
      // 写入数据
      const results = []
      let i = 0
      while (i < words.length) {
        const item = words[i++]
        const { sound, url, explains, trans } = await translate(item)
        results.push(templates(i, item, sound ? `(${sound})` : '', trans, explains, url, 0))
      }
      fs.writeFileSync(target, results.join(newLine))
      log(info(`${target}-文件写入完成`))
    }
  }

  if(fileExisted) {
    await handleFile(fs.readFileSync)(src, target) 
  } else {
    log(error('文件不存在'))
  }
}

// 遍历文件夹
const translateFolder = (folder, target, genTotal) => {
  const children = fs.readdirSync(path.resolve(process.cwd(), folder))

  let i = 0
  while (i < children.length) {
    const child = children[i++]
    const sourcePath = path.resolve(process.cwd(), folder, child)
    const stats = fs.statSync(sourcePath)
    if (stats.isDirectory()) {
      const folderPath = path.join(folder, child)
      translateFolder(folderPath, target, genTotal)
    } else if(stats.isFile()){
      const targetPath = path.resolve(process.cwd(), target, folder, child)
      translateFile(sourcePath, targetPath, target, genTotal)
    }
  }
}

// 创建翻译文件夹
const trans =async (json) => {
  const folders = get(json, 'translate.folders', [])
  const target = get(json, 'translate.target', 'translate')
  const genTotal = get(json, 'translate.total', false)
  console.log(genTotal)

  const generatorDir = (target) => {
    const targetPath = path.resolve(process.cwd(), target)
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath)
    } else {
      log(info(`翻译后的文件在'${target}'文件夹中`))
    }
  }
  generatorDir(target)
  
  folders.forEach(folder => translateFolder(`./${folder}`, target, genTotal))

  if (genTotal) {
    // 分析依赖
    const all = Object.keys(sta.result).map(word => {
      const item = sta.result[word]
      return { count: item, content: word.trim() }
    }).sort((pre, next) => next.count - pre.count)
    // 写入数据
    const results = []
    let i = 0
    while (i < all.length) {
      const item = all[i++]
      const { sound, url, explains, trans } = await translate(item.content)
      results.push(templates(i, item.content, sound ? `(${sound})` : '', trans, explains, url, item.count))
    }
    const targetPath = path.resolve(process.cwd(), target, 'total.md')
    fs.writeFile(targetPath, results.join(newLine), error => log(info(`${targetPath}-文件写入完成`)))
  }
}

trans(json)
