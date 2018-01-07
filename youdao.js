const md5 = require('js-md5');
const request = require('request')
const fs = require('fs')
const path = require('path')
const util = require('ant-util').default
const chalk = require('chalk')

const { keys, guard, identity } = util
const { gets } = util.plugins.exist

const appKey = '2c799d86caea2093'
const key = 'EraYiqPez2EBY3oiq62MxGqnePeMvFAA'
const apiPath = 'http://openapi.youdao.com/api'

const log = console.log
const error = chalk.red
const info = chalk.green
const seg = '/'
const newLine = '\n'
const translated = 'translated'

const createQuery = (search) => {
  const salt = Math.round(Math.random() * 10);

  const query = {
    q: encodeURIComponent(search),
    appKey,
    from: 'auto',
    to: 'auto',
    salt: salt,
    sign: md5(`${appKey}${search}${salt}${key}`)
  }
  return `${apiPath}?${keys(query).map((key) => `${key}=${query[key]}`).join('&')}`
}

const translate = (word, callback) => request(createQuery(word),  (error, _, body) => {
  if (error) throw error;
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

  callback(final)
})
console.log('示例链接:', createQuery('well'))
const templates = (index, word, sound, trans, explains, url) => {
  const finalExplains = explains.filter(identity)
  const ex = finalExplains.length ? `\n    - ${finalExplains.join('\n    - ')}` : ''
  return `${index + 1}. ${word}${sound}:${trans.join(' ')}-${url.url}${ex}`
}

const translateFile = (src, target) => {
  const isExistFile = fs.existsSync(src)

  const generatorDir = (target) => {
    const targetPaths = target.split(seg)
    targetPaths.pop()
    const targetFolder = targetPaths.join(seg)
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }
  }

  const handleFile = (read) => (src, target) => {
    if (fs.existsSync(target)) {
      log(info(`${target}-文件已存在`))
      return
    }
    generatorDir(target)
    const fileContent = read(src).toString()
    const words = fileContent.split('\n')
    const results = []
    const usefulWords = words.filter(word => !!word.trim())
    usefulWords.forEach((word, index) => {
      translate(word, ({ sound, url, explains, trans }) => {
        results[index] = templates(index, word, sound ? `(${sound})` : '', trans, explains, url)
        if (results.filter(identity).length === usefulWords.length) {
          fs.writeFile(target, results.join(newLine), error => log(info(`${target}-文件写入完成`)))
        }
      })
    })
  }

  guard(isExistFile, handleFile(fs.readFileSync) , () => log(error('文件不存在')))(src, target)
}

const translateFolder = (folder, subFolder = translated) => {
  const files = fs.readdirSync(folder)
  files.forEach(file => {
    const filePath = `${folder}/${file}`
    fs.stat(filePath, (_, stats) => {
      if(stats.isFile()) {
        translateFile(filePath, path.resolve(folder, subFolder, `${file}.md`))
      }
    })
  })
}

const folders = ['read', 'new', 'api', 'awl']

folders.forEach(folder => translateFolder(`./${folder}`))

