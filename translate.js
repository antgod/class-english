const md5 = require('js-md5');
const request = require('request');
const fs = require('fs')

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
  callback(JSON.parse(body).trans_result.map((item, key) => `${key+1}.${item.src}:${item.dst}`).join('\n'))
});

const transFile = path => fs.exists(path, exists => {
  exists ? fs.readFile(path, (err, data) => {
    if (err) throw err;
    trans(data.toString(), (result) => {
      fs.writeFile(`${path}.trans`, result, error => console.log(error || '写入完成'))
    })
  }) : console.log(path + '-文件不存在')
})



transFile('./2')

