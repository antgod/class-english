## 英语生词翻译

- 安装依赖
```
npm i
```

- 翻译文件

1. 编写生词文件
```
$ mkdir test && cd test
& vim test
```

test文件
```
(下面\`换成`，即插入代码)
\`\`\`this is my first english word test: hello world\`\`\`
hello
world
```

2. package.json添加如下代码
```
{
  ...
  "translate": {
    "folders": ["test"]
  }
  ...
}
```

3. 执行翻译
```
$ npm start
```

生成的代码:/test/translated/test.md
```
1. hello(həˈləʊ):你好-http://m.youdao.com/dict?le=eng&q=hello
    - n. 表示问候， 惊奇或唤起注意时的用语
    - int. 喂；哈罗
    - n. (Hello)人名；(法)埃洛
2. world(wɜːld):世界-http://m.youdao.com/dict?le=eng&q=world
    - n. 世界；领域；世俗；全人类；物质生活
```

4. 你可以传递`translated`属性来修改翻译路径
```
{
  ...
  "translate": {
    "translated": "trans",
    "folders": ["read", "new", "api", "awl", "reddit", "test"]
  }
  ...
}
```