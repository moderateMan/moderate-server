<describe>
  title: “玩个球啊”，我用cocoreater开发的联网对战游戏
  cover: 443d35d422ec4e0c9e00a48f7ef8c6b3_tplv-k3u1fbpfcp-no-mark_480_480_0_0.webp
  subhead: 你会有各种天马行空的想法，你会有各种想与人表达的冲动，你会有各种意想不到的创意。而这些足以激发你内心最原始的欲望，就是“我们一起玩吧“
  date: 2022/6/18
  tags: game
</describe>



**项目预览地址：**
 - **Moderate入口**：https://zero2one.moderate.run/center/game
 - **独立入口**：https://blog.moderate.run/

# 我看到这个活动，我就兴奋了
首先我非常喜欢游戏开发，我觉得开发游戏会很直接获得编程乐趣的。

你会有各种天马行空的想法，你会有各种想与人表达的冲动，你会有各种意想不到的创意。

而这些足以激发你内心最原始的欲望，就是“**我们一起玩吧**”。

# 介绍一下我做的游戏：“玩个球啊”
对，顾名思义，就是玩球的游戏，233333。

球从小玩到大，玻璃球，乒乓球，羽毛球，篮球，足球各种球，哪个不是童年回忆里标志性的存在。

所以，我觉得“球”是一个很好的点，非常值得做点啥。

## 项目的“前世今生”
首先这个项目启动可以追溯到四年前，我遇到一个哥叫“帅哥”，当时我觉得他美术很厉害，就跟他约了一起搞个小游戏玩玩。

结果人家帅哥帮我把图出了，我当时做到一半，失业了。。。然后就没然后了，我就去了南方打拼了。

但恰巧逛掘金有了这个活动，我一下就想起来了这个项目，看来终于有一个理由把之前的故事圆一下了。

## 游戏的技术栈
首先这款游戏牵扯了不少东西：
- 前端使用的**cocosCreater**。
- 后端使用的**express**。
- 物理引擎方面：
    - 前端-**box2d**。
    - 服务端-**plankjs**。
- 动画制作工具**Dragon Bones**。
- `websocket`库**socket.io**。
- `pm2`，`https`和`wss`等部署相关的。
等等···

每个技术点都值得好好说说，但是这篇文章暂不细讲，主要介绍一下游戏的**大样儿**。

## 游戏的主要场景
游戏简单分为
- 游戏首页：显示游戏的菜单和选项
    - 选人物
    - 选球
    - 菜单，对战，等UI 
- 游戏主体：一共设计了两款游戏模式
    - 单机模式：**子弹球**
    - 对战模式：**玩个球·赛**

效果图如下：

### 游戏首页

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b9b7153ddc34689b4689de4edddf922~tplv-k3u1fbpfcp-watermark.image?)

#### 角色选择页面

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/380f81acbdb049d6b12c9a16623b4c89~tplv-k3u1fbpfcp-watermark.image?)

**一共设计了三款人物**
- 小龙人：

![ezgif.com-gif-maker (2).gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e7de3e797ff45058ace7be49beb4115~tplv-k3u1fbpfcp-watermark.image?)

（现在看，好呆啊～～～）

- 摇滚哥

![ezgif.com-gif-maker (3).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6209b8018a88430ca9d13ca960057ed7~tplv-k3u1fbpfcp-watermark.image?)

（现在看，好机车啊～～～）


- 小傻狗
![ezgif.com-gif-maker (4).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e138d7aa878749719bb9b62b889b4ebc~tplv-k3u1fbpfcp-watermark.image?)

（23333，没叫错～～～）

#### 球选择页面

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd17c4b22c404e10bed97c1d9e55de09~tplv-k3u1fbpfcp-watermark.image?)


设计不少的球，每个球都有不同的材质等物理属性。

*但是，demo版本中，人物和球都是默认第一个*

#### 其他：玩法，成就

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6451b526f3364221934755ba6ea8a7a2~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/396b887a76d7427393bedd42fb9843bc~tplv-k3u1fbpfcp-watermark.image?)

*哈哈哈，大饼，还没做。。。*

### 游戏主体
#### 单机模式：子弹球

![ezgif.com-gif-maker (6).gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5efccd86074d4f899f7ef7e2b59ecbbb~tplv-k3u1fbpfcp-watermark.image?)

#### 对战模式：

![ezgif.com-gif-maker (7).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b5e2d0cd3442ff98a89917407e1118~tplv-k3u1fbpfcp-watermark.image?)

至此这个游戏的大样儿，就介绍完了。

# 题外话
时隔多年，再一次翻看曾经写过的代码，感慨万千，或得意，或羞耻，或惊喜，或感伤，而唯独一种情绪最为醉人，那便是一种说不出的感动，隐约有种失而复得之感，仿佛遇见了一位许久未见的老友，就在刹那神游之间，好似做了一个梦，我与多年的自己对话了。

- “**现在的你过的怎么样。**”曾经的我问。
- “**托您的福，还可以，233333。**”我说。
我们彼此都笑了笑，然后曾经的我接着又问。
- “**换电脑了吧**”
- “**换了，那是肯定换啊，现在一台16寸Mac，一台拯救者，佩奇了。**”我略带得意的说。
- “**可以可以，看来混的不错嘛**”
- “**那可不，你不知道，现在的我不但从不加班，上超市买东西都不看价了，而且每年还能存不少，而且·····**”我滔滔不绝秀了一波优越。
- “**可以啊，不错不错，这不比我这时好太多太多了么**”
- “**那可不，你那时苦的啊，亏了我改了，要不。。。**”我忽然觉察出自己说错话了，我瞅了一眼曾经的自己，我能感觉出他有些难为情。
- “**哈哈哈，确实，我那时太傻了，还不勇敢，很多事都想的太简单，总凭意气去用事，犯了不少错，一定给你添了不少麻烦吧，对不住了**。”可能曾经的我也觉察出我的异样，连忙说道。
- “**没有，没有，没有，还好，还好。**”
此时有种酸楚感涌上心头，让我有种迫切的冲动，想去承认一件自己做过却从没承认的事。
- ”**对不起，是我把你弄丢了，原谅我刚才的那些话，其实我最想跟你说的是，‘谢谢你’，还记得你那时常说的那句‘我一定能成就一番事业的‘么，23333，虽然有点狂了，不知道能不能成，但是我信，我一直信到现在，管它成不成呢**。“我笑着对他说，他笑着看着我，然后转身离开，并背着挥手告别。
- “**很高兴能再见你，我们还能再见么？**”我认真的问到。
- “**别担心，我一直都在，对了，勇敢点，别怕了，输不丢人的，怕才丢人**。”
- ”**了然**。“
