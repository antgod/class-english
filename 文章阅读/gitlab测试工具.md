```
https://about.gitlab.com/2017/12/19/moving-to-headless-chrome/?utm_source=wanqu.co&utm_campaign=Wanqu+Daily&utm_medium=website

gitlab最近把我们前端的测试与未来的测试从phantomjs过渡成headless chrome。这篇文章我们将介绍过渡的原因，面临的困难，以及我们开发的解决方案。
我们希望这将造福其他想过渡的人。

在现代浏览器中，我们现在有精确的方式测试gitlab。过渡提高我们当我们直接运行(gitlab)时编写测试并且调试的能力。
重大的改变迫使我们面对并清除曾经使用的hacks代码

## 背景
我们近五年的时间使用PhantomJS作为gitlab测试。当我们没有什么选择的时候，在非浏览器环境测试跑起浏览器集成测试，它曾是非常有用的工具。
然而，它有一些缺点

```
## 单词
challenges
benefit
accurate
immensely
integration
available
accurate
improved
confront