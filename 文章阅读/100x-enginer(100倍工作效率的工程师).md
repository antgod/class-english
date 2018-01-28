```
### 原文链接
https://zef.me/the-100x-engineer-6d50a690a866

### 疑难句

- Well, for one
- not all that motivating
- this is not the programming reality in any place where I have ever worked
- But to be frank, and I think I can say this here, for a skill we tend to brag about - so much, we’re pretty damn bad at it.
- Industry Average: “about 15–50 errors per 1000 lines of delivered code.” He further says this is usually representative of code that has some level of structured programming behind it, but probably includes a mix of coding techniques.
- I say，we should avoid programming whenever we can and save the world from all those bugs we introduce every time we press a key in our IDE.
- I like stretch goals. They often lead to taking a step back and to big shifts in thinking.
- insert flavor of the day here
- Most importantly that means: no finger pointing
- somewhere buried in all this “challenge everything” talk

### 翻译

工程师如何花同样的时间比其他人生产的价值多100x？就像投资钱，不是说投越多钱你就能赚越多，关键在于投对了地方；工作中你是在投资时间，不是投资越多时间你就能产生越多价值，关键是得作对东西。

怎么才能做对东西？其实可以换个方向想，怎么才能避免做无用功？产品经理给你个功能，你是直接做、还是先质疑一下：为什么要做、有没有必要做、能不能砍掉80%的需求又能达到同样的效果？


#### 100x工作效率的工程师

几个月前，我们的团队有一位新工程师加入。一如既往的我花了一些时间了解他是哪种性格的人，是什么驱使他。

我们通常讨论过去的经理，但是更重要的：未来的目标。最后，他还有一个有趣的目标：

我想成为世界上最好的程序员。

多么有野心啊，我喜欢这个目标。

然而，值得我思考的是-成为最好的程序员，这句话的实际意味着什么。如何去衡量它，他自己怎么知道他是不是最好的程序员呢？

这让我想起了1960年Sackman, Erikson编写并授权发表的《Exploratory Experimental Studies Comparing Online and Offline Programming Performance》。

目标是调研不同程序员在各种编程方面的表现差异。程序员可以访问交互式大型计算机，或者是纸和笔。虽然问题的答案已经被废弃了-谁还在纸上编程-仍然有一些发现：

- 在研究这些参与者时，成这些编程练习，最好的和最差的人有20倍的速度差异
- 有25倍的调试时间差异
- 有5倍的代码差异
- 有10倍的执行速度差异

调研这些参与人员都有很多年的工作经验，事实上这些经验看起来对数字并没有产生重要的影响。总而言之，有显著的差异，不是么？

#### 10倍程序员

这篇文章是介绍10倍程序员概念的起源。这令人数十年着迷，并且高度争议。

为了公平起见，Sackman的数字确实被夸大了，很多人质疑他们的方法。然而，争吵过后，他们发现即使差劲的程序员和惊人的程序也有显著的差异，
甚至有传闻说他们能在很短的时间造出惊人的软件。

#### 谁在乎
你可能会问："谁在乎？"，为什么10倍的程序员如此重要？

那么，至少从表面上看，10倍工程师对于雇主来说是个好事，理论上他们可以做这些：

- 解雇90%的劳动力
- 另外10%雇佣十倍工程师
- 假设赋给他们双倍的钱
- 节省利润

很简单，不是么？

真的么？然而，事实有点不一样。开始时，假设你能招到整个团队的10倍工程师，那么恭喜你。但是由于你可能无法做到这点，你必须把他们整合到你现
有的团队，结果在你的团队中，有人显著的比你高效生产，而并不能调动所有人的积极性。

但实际上，我并不想过多的谈及10倍程序员，因为在我的观点里，有一个不同"类型"的人影响力要远超10倍工程师的人。

#### 谁
首先我们来看看程序员这个团队。在sachman的调查中，他们专注与聚焦独立完成程序的能力。高效算法的联系，比如说："给出一个迷宫的标识，写一个
查找出口路由的程序"，这正式好的程序员擅长的，有挑战的程序，并且编码完成它。每个程序员都有他们自己的任务队列，并且一个接一个的敲出来。

#### 敲代码

如果你也喜欢这样，我确认有些地方你可以用这种方式工作。

然而，这并不是我曾经工作过的所有场景。感谢上帝，坦白的说，很长时间，我都觉得这很无聊。

我发现更有意思的是工程师这个角色。工程师把想法做成现实中的工作产品。并且他们有宽广的观点。他们有一整套可用的工具来完成工作，当然，编程也是
其中的一部分。

坦白的说，我们应该吹嘘一个技能，

#### 统计不会说谎：

a): 产业平均值：在已经提交的代码中，每1000行有15~50个错误。他进一步说在这之后代表了一些结构化层次的代码，也可能包括混合代码技术
b): 微软应用程序：在测试中发现每1000行代码中有10~20个缺陷。在发布的代码中每1000行代码有0.5个缺陷。这结合了读取代码与测试功能的统计结果。
c): Harlan Mills驱动cleanroom开发，一项可以达到1000行代码低于3个缺陷的比率技术在测试阶段。和线上阶段1000行代码0.1缺陷。在一些产品中，
如航天软件中，如果使用系统化的结构开发方法，盯紧reviews，统计测试，可以达到接近500000代码中0个错误。

我是说，我们可以尽我们所能的避免编程中以及我们在IDE中按下键引发的所有异常。

所以，10倍的程序员，不错的注意。但是我说的是更高的目标，在2018年，世界将被改变。

#### 100x程序员
我喜欢可变的目标，他经常能让我们退一步说话并且在思想上所有转变。如果我们想成为100x工程师，能对1倍的程序员有100x的影响，我们应该怎么做呢？

使你自己变得更有效率是不够的，10倍测程序员纯属靠天子就可能达到。但是不是100x。为了到达100x编程的影响，你必须把你的生产力投入到你的组织，
最后，领导其他人以同样的方式工作。

虽然100x听起来有些夸张，在我的职业生涯中和各种人接触过，我确认有100x的思维，一个特别的思考、谈话与处理方式。

有人可能会惊讶，这与编程能力、技术、语言没有任何关系。他们通常会呼喊：'为什么我们要用java，如果我们使用scala,clojure,node，我们产能会变得
更高'。不同的便车跟语言也许能使你提高1.5~2x的上限。这对100x来说是小儿科，100x是完全不同的游戏。

那么什么是100x的效果？让我们从两个方面讨论。

#### 所有权（控制权）

100x知道他们应该做什么，他们知道为什么，如何去做以及做的什么什么。在《极端所有权》书中，两个前海军解释到极端所有权的概念。核心概念正式我所说
的拥有权。你必须对你做的每一件事负责。

最重要的是，不要指点其他人，自己应该学会担当。这并不意味着每件事都在你的掌控之下，它意味着当事情不可避免的时候，你应该尽可能的做出正确的抉择。
这意味着你必须有预期未来可能偶然发生并做好突然事件的准备。意味着你需要从错误中吸取教训并获得有价值的东西。掌控你做的事情的每一个方面。

我知道拥有权的另一种方式，通过质疑事情。通过质疑你和你的团队每件事的一切，所以你就能明白并且掌握每一个决定。

#### 挑战现状

100x挑战事物在三个方面：

什么：首先关于范围，我们开发什么，并且这个范围是否合理，在团队的需求中一切都是清晰的吗，并且每件事都很重要并且需要我们做，真的吗？

如何：然后关于如何更聪明的去做，用最小的努力得到相同的结果。同样也是关于过程：我们如何拿到结果，我们怎么改进过程？

为什么：关于业务的环境，需要完全理解我们为什么开发这个功能，并且检查产品经理为了达到客户目的，是否选择了正确的方向。

我们来看看每一项：

#### 等等
说起来容易做起来难，不是每个人都想成为100x工程师。然而，每个人都渴望更好的解决问题。

因此，我们值得看看100x程序员的技能，它和10x程序员有很大不一样。

- 沟通：这一点是最明显的，也是最重要的。100x拥有卓越的沟通技巧。沟通是他们拥有100倍效率的本质。
- 创造力：显然10x也有这种能力，但这并不是算法，类结构设计，而是更有效的达到目标的方法。
- 共鸣：有些地方比如质疑任何事被埋葬了，我提到了是"挑战生产力"，到底是指什么呢？让我以我四岁的大儿子作为例子。他最感兴趣的问题是"为什么"，
所以我儿子就是100x程序员么？当然不是，因为他总是问为什么。无论是否时间合适，无论场景是否合适，他弄得他父母想自杀。拥有与其他人共鸣的知晓
什么该去质疑，如何质疑并且什么时候质疑同样是100x工程师本质的技能
- 谈判：被高估的技能，每个人都有的技能。但是很少有人试图使用它们。能够实现你的想法的本质是你需要去进行与开发、产品经理和其他利益相关者的谈判。
解释为什么你的想法是好的并且什么时候执行他们，100x知道如何去做，因为他们眼里周围的一切看都有可能。
- 技术：列表的最后一项，但是非常重要。虽然大多数提到技能非常"软"，但是并不意味着100x不需要技术。事实上，是这他成为顶尖人才的先决条件之一。
有两个原因:1)技术层面的挑战能产生巨大的收益，因此需要深入的技术理解力。2）风气很重要。如果100倍的功能吃技术不强，那他不会被同事所接受，你必须
是同事的一员。

几个月前，"我想成为世界上最好的程序员"先生做的很好。作为一个程序员，他很有才，工作勤奋切非常搞笑并且聪明、时髦。他是世界上最好的程序员吗？我
不知道。

但是我暗暗的觉得这都没关系。

但是我相信一段时间之后，也许是几年后，他想做更多的事。到那是为了完成他的梦想不仅仅是仅有一个变成的目标。而是渴望能达到100x影响。
```
ambitious
consider
measure
investigate
participants
significant
concept
originates
fascinated
exaggerated
challenged
dispute
shockingly
anecdotally
shockingly
ostensibly
conceptually
fire
workforce
profit
since
integrate
productive
motivating
dwell
perspective
dwell
breed
solely
algorithmic
representing
maze
boring
perspective
thus
frank
tend
brag
damn
delivered
defects
stretch
shifts
academy
accomplish
sheer
talent
ultimately
career
mindset
peanuts
aspects
former
inevitably
anticipating
contingency
challenging
productively
dimensions
Communication
implemented
essential
inheritance
Empathy
Negotiation
overrated
stakeholders
vital
prerequisite
talent
yield
gains
therefore
ethos
peers
figure out
talented
aspire