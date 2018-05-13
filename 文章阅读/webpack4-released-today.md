```
# webpack 4: 今天发布
代码名称：Legato
今天我们很高兴的宣布webpack 4 (Legato) 发布了。你可以通过yarn或者npm使用：
```
$> yarn add webpack webpack-cli --dev
```

或者

```
$> npm i webpack webpack-cli --save-dev
```

# 为什么叫Legato
我们想开启一个新的传统，给每个主线发布版本起一个名字。因此我们把特权给予最大的开源组织贡献者：trivago!

所以我们像他们发出请求并得到了反馈：

[at trivago]我们通常以音乐主题为项目命名。旧的js framework叫做“harmony”,新的框架叫做“melody”,在php端，使用“Symfony”的上层封装“Orchestra”。

Legato意味着连续播放序列中的每一个音符。

webpack把整个前端资源一起打包，没有间隙（js,css&more）。所以我们觉得“legato”很适合webpack——trivago工程师Patrick Gotthardt。

我们非常激动，因为我们这次发布所做的每件事都是webpack让用户使用时候感觉连续，没有任何间隙。

十分感谢trivago赞助的无私的一年，并且为webpack 4起了个名字。

# 有什么更新
webpack4有非常多的更新，我不能全部列出否则的话这篇文章就不能如期发表。如果想看到从3到4完整更新，请查看发布清单和更新日志。
## webpack 4更快(98%提速)!
我们已经看到社区测试我们的beta版本的构建性能令人感兴趣的报告，所以我发出了一个民意调查验证我们的发现。

测试结果令人吃惊，构建时间压缩了60~98%！！这只是我们收到的部分反馈。

这同样给我们一些机会识别在loader与plugins的一些关键bugs。PS：我们没有实现多入口和持久缓存（v5实现），这意味着我们还有很多工作去实现。

构建速度是我们这次发布的优先级最高的目标。我们可以增加更多的特性，但是如果造成损耗或者在开发阶段浪费时间，那有何意义呢？这只是我们收到的一些例子，我们期盼你们使用它并且通过twitter的#webpack #webpack4提交你们的构建时间。

# mode,零配置默认值

mode:为你的config推出的全新属性。有两个选项：开发和生产环境的默认值，并且默认值是开箱即用的。mode是我们提供的为了size或者构建时间优化的默认最佳配置。

想看更多mode列表，大家可以通过看之前的一篇媒体文章《webpack 4: mode and optimization》

另外，entry,output也有默认配置了，这意味着你不需要配置才能工作。通过mode，在我们做了如此多的提取之后， 你的config文件难以置信的小。

# Legato意味着连续不间断的演奏每个节奏
基于以上所做的事情，我们提供零配置平台来让你扩展。webpack最有价值的特性就是深度可扩展性。我们定义的(zero-config)你看起来像什么。当我们完成设计并且把我们的webpack预设发布，这就意味着你可以扩展zero-config成为唯一的并且为你的工作流、公司甚至框架社区打造一个完美的配置。

✂ Goodbye CommonsChunkPlugin
# CommonsChunkPlugin再见
我们准备弃用并移除CommonsChunkPlugin，替换成一个默认配置并且容易被`optimization.splitChunks`API替换，开箱即用，在各种场景中自动为你生成公共模块。

关于我们做这个的更多信息和api风格，请看提交记录。

# web模块化支持
Webpack now by default supports import and export of any local WebAssembly module. This means that you can also write loaders that allow you to import Rust, C++, C and other WebAssembly host lang files directly.
webpack4.0默认支持本地的web模块中的import和export。这意味着你可以写loaders直接支持在Rust, C++, C和任何其他模块化语言文件。

🐐 Module Type’s Introduced + .mjs support
# 模块类型介绍、.msj支持
之前，webpack中的javascript是唯一的默认配置类型。用户不需要使用css/html bundles等造成了尴尬的麻烦。我们已经从我们的代码抽出了js特性，现在构建时候我们有五种类型实现。

javascript/auto: (webpack 3默认类型) 所有模块化系统均可使用: CommonJS, AMD, ESM
javascript/esm: es模块化系统，其他模块化系统不可使用 (.mjs文件默认值)
javascript/dynamic: 仅仅commonjs和amd，es模块化系统不可用
json: json数据，通过require和import渠道导入可用（默认为.json的文件）
webassembly/experimental: WebAssembly 模块 (.wasm 文件的默认值，目前还是试验阶段）

另外，webpack现在按照.wasm, .mjs, .js and .json顺序直接查找扩展名的文件。

最让人激动的特征是，可以继续支持css和html模块类型（预计4.x或者5实现）。允许我们有能力把html作为入口文件。

# 如果使用HtmlWebpackPlugin
If you use HtmlWebpackPlugin
For this release, we gave the ecosystem a month to upgrade any plugins or loaders to use the new webpack 4 API’s. However, Jan Nicklas has been away with work obligations, and therefore we have provided a patched fork of html-webpack-plugin . For now you can install it by doing the following:

$> yarn add html-webpack-plugin@webpack-contrib/html-webpack-plugin
When Jan returns from overseas work at the end of the month, we plan to merge our fork upstream into jantimon/html-webpack-plugin ! Until then, if you have any issues, you can submit them here!

UPDATE (3/1/2018): html-webpack-plugin@3 is now available with v4 support!!!!

If you own other plugins and loaders, you can see our migration guide here:

webpack 4: migration guide for plugins/loaders

This guide targets plugin and loader authors
medium.com	
# 还有更多特性
还有很多的特性，我们强烈的建议你查看我们的官方更新日志。

# webpack v4的文档在哪
我们已经接近完成迁移用户指南和v4的新增文档。为了追踪过程或者搭把手帮我们构建，请顺便访问documentation repository，剪出next分支，并且获得最新帮助。


🤷‍ What about <framework>-cli?
Over the past 30 days we have worked closely with each of the frameworks to ensure that they are ready to support webpack 4 in their respective cli’s etc. Even popular library’s like lodash-es, RxJS are supporting the sideEffects flag, so by using their latest version you will see instant bundle size decreases out of the box.

The AngularCLI team has said that they even plan on shipping their next major version (only ~week away) using webpack 4! If you want to know the status, reach out to them, and ask how you can help [instead of when it will be done].

# 为什么用这么多表情？
因为做出了难以置信的产品，我们很开心，你也可以试一下。

# 下一步怎么办？
我们已经开始着手准备webpack4.x和5的计划，包括但不仅限于：

```
ESM Module Target
Persistent Caching
Move WebAssembly support from experimental to stable. Add tree-shaking and dead code elimination!
Presets — Extend 0CJS, anything can be Zero Config. The way it should be.
CSS Module Type — CSS as Entry (Goodbye ExtractTextWebpackPlugin)
HTML Module Type — HTML as Entry
URL/File Module Type
<Create Your Own> Module Type
Multi-threading
Redefining our Organization Charter and Mission Statement
Google Summer of Code (Separate Post Coming Soon!!!)
```

# 再次谢过
所有涉及贡献给我们代码的人，核心团队，loader或者插件作者。第一次提交commit的人，和协助我们解决问题的人，我们不得不感谢你们，这个产品为你打造，并且你塑造了它。
```

announce
tradition
privilege 
openCollective 
sponsor
theme
layer
gaps
entire
thrilled
encapsulates 
incredible
sponsorship
secure
community 
startling
opportunity
multicore
persistent
priorities
inaccessible
waste 
look forward
sensible
optimized
optimization
deprecated
scenarios
Assembly
Historically
awkward
slate
respective
decreases 
incredible
sustainable
heavily
specificity