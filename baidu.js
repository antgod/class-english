const md5 = require('js-md5');
const request = require('request');
const fs = require('fs')
const path = require('path')

const createQuery = (search) => {
  const r = Math.round(Math.random() * 999999);
  const appid = '20180103000111824'
  const query = {
    q: search,
    appid,
    from: 'auto',
    to: 'zh',
    salt: r,
    sign: md5(`${appid}${search}${r}0OhyjiSqT0KJiM9amNQU`)
  }
  return Object.keys(query).map((key) => `${key}=${query[key]}`).join('&')
}

const trans = (word, callback) => request(`http://api.fanyi.baidu.com/api/trans/vip/translate?${createQuery(word)}`,  (error, response, body) => {
  const result = JSON.parse(body).trans_result || []
  callback(result.map((item, key) => `${key+1}.${item.src}:${item.dst}`).join('\n'))
})

const transFile = (src, tar) => fs.exists(src, exists => {
  exists ? fs.readFile(src, (err, data) => {
    if (err) throw err;
    if (fs.existsSync(tar)) return
    const tarPaths = tar.split('/')
    tarPaths.pop()
    const tarFolder = tarPaths.join('/')
    trans(data.toString(), (result) => {
      if (!fs.existsSync(tarFolder)) {
        fs.mkdirSync(tarFolder)
      }
      fs.writeFile(tar, result, error => console.log(error || `${tar}-文件写入完成`))
    })
  }) : console.log(src + '-文件不存在')
})

const transFolder = folder => {
  const files = fs.readdirSync(folder)
  files.forEach(file => {
    const filePath = `${folder}/${file}`
    fs.stat(filePath, function (err, stats) {
      if (err) throw err
      if(stats.isFile()) {
        transFile(filePath, path.resolve(folder, './trans', file + '.trans'))
      }
    })
  })
}

const folders = ['read', 'new', 'api']

folders.forEach(folder => transFolder(`./${folder}`))

