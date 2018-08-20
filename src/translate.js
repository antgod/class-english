const request = require('request')
const fs = require('fs')
const path = require('path')
const util = require('ant-util')
const json = require('../package.json')
const { mkdir, statistics, log, info, warn, error, createQuery } = require('./common/common')

const { identity } = util
const { gets } = util.plugins.exist

const newLine = '\n'
const ignoreFrag = /```([\s\S]*)```|\([^)]*\)|（[^）]*）|[\u4e00-\u9fa5]|[,;，；]|#.*\n/g
const ignoreWord = /^\/$|^$/

const statis = statistics()

// 调用api接口翻译单词
const translate = (word) => new Promise((res) => {
  const url = createQuery(word)
  request({
    url,
    timeout: 2000,
  },  (err, _, body) => {
    if (err) {
      log(error(`查询单词：${word}接口调用超时`))
      res({
        success: false,
      })
    } else {
      try{
        const result = JSON.parse(body || {})
        const final = gets(result, {
          trans: [],
          webs: [],
          explains: [],
          sound: '',
          url: '',
          success: true,
        })({
          trans: 'translation',
          webs: 'web',
          explains: 'basic.explains',
          sound: 'basic.phonetic',
          url: 'webdict',
          success: 'success'
        })
        res(final)
      } catch(e) {
        log(body)
      }
    }
  })
})

// 生成模板
const templates = (index, word, sound, trans, explains, url, count) => {
  const finalExplains = explains.filter(identity)
  const finalUrl = false ? `${newLine}    ${url.url}` : ''
  const meaning = finalExplains.length ? `${newLine}    - ${finalExplains.join(`${newLine}    - `)}` : ''
  const totalCount = count ? ` (${count}次)` : ''
  const result =  `${index}. ${word}${sound} : ${trans.join(' ')}${totalCount}${finalUrl}${meaning}${newLine}`
  return result
}

// 读取、翻译以及生成翻译文件
const translateFile = async (sourcePath, targetPath, { target, genTotal, rewrite }) => {
  let needRewrite = ''
  // 处理文件夹
  if (fs.existsSync(targetPath)) {
    if (!rewrite && !genTotal) {
      log(warn(`${targetPath}-文件已存在`))
      return
    } else if(rewrite && !genTotal) {
      needRewrite = '重新'
    }
  } else {
    const targetFolder = targetPath.split('/').reverse().slice(1).reverse().join('/')
    mkdir(targetFolder, { cwd: target })
  }

  const analysisWords = (line) => {
    return line.split(' ').filter(word => !ignoreWord.test(word))
  }

  const handleFile = (read) => async (sourcePath, targetPath) => {
    const lines = read(sourcePath).toString().replace(ignoreFrag, '').split(newLine)
    const words = lines.reduce((words, line) => words.concat(analysisWords(line)), [])
    statis.collect(words)

    if (!genTotal) {
      // 写入数据
      log(`${targetPath}-准备生成文件`)
      const results = []
      let i = 0
      while (i < words.length) {
        const item = words[i++]
        const { success, sound, url, explains, trans } = await translate(item)
        if (success) {
          results.push(templates(i, item, sound ? `(${sound})` : '', trans, explains, url, 0))
        }
      }
      log(warn(`${targetPath}-文件单词数:${results.length}`))
      fs.writeFileSync(targetPath, results.join(newLine))
      log(info(`${targetPath}-文件${needRewrite}写入完成`))
    } else {
      log(warn(`${targetPath}-文件收集完成，单词数：${words.length}`))
    }
  }

  await handleFile(fs.readFileSync)(sourcePath, targetPath) 
}

// 遍历文件夹
const translateFolder = async (folder, options) => {
  const children = fs.readdirSync(path.resolve(process.cwd(), folder))
  let i = 0
  while (i < children.length) {
    const child = children[i++]
    const sourcePath = path.resolve(process.cwd(), folder, child)
    const stats = fs.statSync(sourcePath)
    if (stats.isDirectory()) {
      const folderPath = path.join(folder, child)
      await translateFolder(folderPath, options)
    } else if(stats.isFile()){
      const targetPath = path.resolve(process.cwd(), options.target, folder, child)
      await translateFile(sourcePath, targetPath, options)
    }
  }
}

// 翻译入口
const entry = async (json) => {
  const options = gets(json, {
    folders: [],
    target: 'translate',
    genTotal: false,
    rewrite: false,
  })({
    folders: 'translate.folders',
    target: 'translate.target',
    genTotal: 'translate.total',
    rewrite: 'translate.rewrite'
  })

  const { folders, target, genTotal } = options

  // 生成翻译文件夹
  mkdir(path.resolve(process.cwd(), target))
  
  // 依次翻译目标文件夹
  let i = 0
  while (i < folders.length) {
    const folder = folders[i++]
    await translateFolder(`./${folder}`, options)
  }

  if (genTotal) {
    // 分析依赖
    const result = statis.result
    const all = Object.keys(result).map(word => {
      const item = result[word]
      return { count: item, content: word.trim() }
    }).sort((pre, next) => next.count - pre.count)

    // 写入数据
    log(`开始批量翻译单词，翻译后写入'${target}/total.md'文件中`)
    const results = []
    let i = 0
    while (i < all.length) {
      const item = all[i++]
      const { success, sound, url, explains, trans } = await translate(item.content)
      if (success) {
        results.push(templates(i, item.content, sound ? `(${sound})` : '', trans, explains, url, item.count))
      }

      if (i % 50 === 0) {
        log(warn(`已翻译单词个数：${i}`))
      } 
    }
    const targetPath = path.resolve(process.cwd(), target, 'total.md')
    fs.writeFile(targetPath, results.join(newLine), err => {
      if(err) {
        log(error(`${targetPath}-文件写入失败`))
        return
      }
      log(info(`${targetPath}-文件写入完成`))
    })
  }
}

entry(json)
