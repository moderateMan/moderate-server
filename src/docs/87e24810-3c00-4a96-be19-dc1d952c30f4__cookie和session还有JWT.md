<describe>
  title: 浏览器的重绘和回流
  cover: jwt.jpeg
  subhead: 浏览器你应该了解的多一点
  date: 2022/4/5
  tags: basics
</describe>

# cookie

HTTP 协议是一种`无状态协议`

cookie 是一个浏览器用来存数据的手段，保存在客户机硬盘上，大小为 4kb。

Cookie 通常用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态

生命周期主要依赖`Expires`或  `Max-Age`指定的时间，否则的话就关闭浏览器就失效了。

## **Cookie 的作用域**

`Domain`  和  `Path`标识定义了 Cookie 的作用域

如果不指定，默认为当前主机(**不包含子域名**）。

如果指定了`Domain`，则一般包含子域名。

设置  `Path=/docs`，则以下地址都会匹配：

- `/docs`
- `/docs/Web/`
- `/docs/Web/HTTP`

不能跨域哦

# session

session 是后端创建的一个对象，同时创建 id，标识这个会话，通过 set-Cokie 头的方式返回这个 id，然后浏览器就会将这个 id 存在 cookie 中，每次请求接口的时候，都会返回回去，后台就会判断是有带有 sessionId 或者是否正确来判断是否是同一对话。

缺点就是多服务中不共用，这个 seesion 是专属于单个服务端的，这样负载均衡转发到其他服务器的话就无法保持对话状态了。

解决办法，就是解决共享的问题，那就是将这个 session 保存在一个数据库中，或者保存在一个 radis 中，这样多台服务器就能共享了。

CAS（Central Authentication Service），即中央认证服务

# session-cookie 引发的安全问题

## CSRF

Cross-site request forgery 跨站请求伪造

利用了浏览器登录网站自动带着 cookie 的特点

场景描述：

黑客做了一网站 B，你访问了之后，如果你有网站 A 的登陆 cookie 的话，那么他会写一些攻击性的代码，然后暗自的去请求网站 A，毕竟浏览器存在这个 cookie，那么自然发送给网站 A 并通过检验，然后就被伪造请求了。

防御手段：

token

**HTTP Referer，它记录了该 HTTP 请求的来源地址**

## XSS（Cross Site Scripting，为了不混淆故叫 xss）

**注入脚本攻击，利用了输入域输入信息并显示的特点，输入了可执行了脚本标签，当显示的时候就会执行，那么就会利用这一点进行非法操作，比如通过 document.cookie 获得 cookie 并发送回黑客的服务从而窃取 cookie。**

防御手段：转义、过滤处理

# JWT（json web tokens）

用于`安全的`将信息作为  `Json 对象`进行传输的一种形式

JWT 中存储的信息是经过`数字签名`的

**JWT 和 Session Cookies 就是用来处理在不同页面之间切换，保存用户登录信息的机制**
`单点登录`是当今广泛使用 JWT 的一项功能，因为它的开销很小

## **JWT 的格式**

- `Header`
- `Payload`
- `Signature`
  ![17147e39ca50d82a_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.png](https://s1.imagehub.cc/images/2022/04/05/17147e39ca50d82a_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0.webp)

### Header

JWT 的标头，它通常由两部分组成：`令牌的类型(即 JWT)`和使用的  `签名算法`，例如 HMAC SHA256 或 RSA。

```jsx
{
"alg": "HS256",
"typ": "JWT"
}
```

指定类型和签名算法后，Json 块被  `Base64Url`编码形成 JWT 的第一部分。

### **Payload**

声明是有关实体（通常是用户）和其他数据的声明。共有三种类型的声明：**registered, public 和 private**声明

```jsx
{
"sub": "1234567890",
"name": "John Doe",
"admin": true
}
```

`Base64Url`编码形成 JWT 的第二部分。

### **signature**

一个签证信息，通过第一部分的 header 和第二部分 payload 的`Base64Url`之后的值和一个密钥一起加密的

# JWT 和 session-cookie 的比较

| asd                    | jwt | session-cookie | 描述                                                                                                                                                                           |
| ---------------------- | --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 实效性（后端主动清除） | no  | yes            | session-cookie 的最大的优势                                                                                                                                                    |
| 共享性（跨域和分布）   | yes | no             | session-cookie 如果想共享的话，那么就需要将 session 托管到一个共享的数据库中或者 radis 中                                                                                      |
| 扩展性（即节约成本）   | yes | no             | session 是需要存储的，而且查询 session 信息可能会有数据库查询操作势                                                                                                            |
| 安全性（防御 CSRF）    | yes | no             | 因为 token 是代码中请求时加入在请求头中的，是程序行为，黑客传通过 img 标签伪造的请求的方式，是获得不到的，但是 session-cookie 就可以，主要还是因为这种校验时浏览器的自动行为势 |

## 单点的登陆

### CAS

CAS（Central Authentication Service），即中央认证服务，是 Yale 大学发起的一个开源项目，旨在为 Web 应用系统提供一种可靠的单点登录方法。

既然不能跨域获取，那 CAS 如何做到共享呢？它通过跳转中间域名的方式来实现登录。

![16f74f3f11a6fbad_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0 (1).png](https://s1.imagehub.cc/images/2022/04/05/16f74f3f11a6fbad_tplv-t2oaga2asx-zoom-in-crop-mark_1304_0_0_0_1.webp)

# Http 重定向

301 永久重定向

302 临时重定向

304 浏览器缓存
