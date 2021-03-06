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
    "folders": ["test"],
    "target": "translate",
    "rewrite": true,
    "total": true
  }
  ...
}
```
<pre>
target：翻译后文件夹目录名
rewrite：是否重写已经翻译过的文件
total：是否生成一个翻译文件，这里有统计单词出现个数
</pre>

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

### 后续需求：
每次翻译，把翻译的单词加入日志，最后统计日志中单词的出现个数，统计出高频单词

制作自己的单词表

提取高频单词，可以按照文章或字母顺序、日期排序

找到高频单词在文章中出现的位置以及例句

自动生成单词的近义词列表

### 背单词方法

- 筛选单词表，会的单词删选掉，生成生词表a

- 使用机器翻译一次所有筛选过的单词，生成生词表b

- 大声朗读b里单词发音和意思，至少3遍。

- 在a里把每个单词朗读一遍然后标记中文意思，能想起来就删掉

- 重复以上步骤，直到a表里没有任何单词