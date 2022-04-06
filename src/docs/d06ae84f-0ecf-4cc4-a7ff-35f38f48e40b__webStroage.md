<describe>
  title: 聊聊浏览器存储的那些事儿
  cover: html5.jpeg
  subhead: 浏览器你应该了解的多一点
  date: 2022/4/5
  tags: basics
</describe>

# 浏览器存储一些数据都可以用啥？

`webStorage`和`cookie`，我反正主要用`webStorage`，我们重点说下，`cookie`就简单做下对比介绍即可。

## 聊聊`webStorage`

### `LocalStorage` 和 `SessionStorage` 的区别

|                  | 持久性           | 共享性                                            | 大小 | 保存位置               | 存储数据的要求                                                        |
| ---------------- | ---------------- | ------------------------------------------------- | ---- | ---------------------- | --------------------------------------------------------------------- |
| `LocalStorage`   | 永久             | 同浏览器，不同标签， 同源情况下，可以             | 5m   | 文件形式，保存在客户端 | 只能存字符串，复杂的可以用 `JSON.stringify` 取得时候再用 `JSON.parse` |
| `SessionStorage` | 标签页关闭就清空 | 同浏览器，不同标签， 同源情况下，并且还是同标签页 | 5m   | 文件形式，保存在客户端 | 同`LocalStorage`                                                      |

### `LocalStorage` 是永久的，那怎么设置时间限制呢？

思路很简单，简单封装一下，在设置的时候加个时间限制信息，当获取数据的时候，进行判断，未过期就返回，过期返空。

```js
export default {
    set(key,data,time){
        let obj={
            data=data,
            ctime:(new Date()).getTime(),//时间戳，同Date.now()
            express:1000*60*60//设置过期时间一个小时
        }
        localStorage.setItem(key,JSON.stringify(obj));
    },
    get(key){
        let obj=JSON.parse(localStorage.getItem(key));
        let getItem=(new Date()).getTime();
        if(getItem-obj.ctime>=express){
            localStorage.removeItem(key);
            return null;
        }else{
            return obj.data;
        }
    }
}
```

## 聊聊`cookie`

### 特点以及连带的弊端

#### 特点

- cookie 的大小受限，才 4KB。
- cookie 是服务端生成，客户端进行维护和存储。
  - 后台通过 `http` 头 `set-cookie`将`cookie`数据存入，然后发给浏览器，浏览器会存储起来，当再请求时候，浏览器会自动带上传给后台。
  - 前端也可以通过`document.cookie`可以读写 `cookie`,数据格式大体如此`"aaa=aaa;bbb=bbb"`

#### 连带的弊端

- **存不了太多数据**：`cookie` 太小了
- **安全性成问题**：`HTTP`请求中的 `Cookie`是明文传递，而且前端也能通过`document.cookie`获得`cookie`进行读写，会有**`xss`攻击**的风险（`Cross Site Scripting`，为了不混淆故叫 `xss`，绝了）。
  - 使用`Https`，就密文了。
  - 解决办法加`httpOnly`，禁止前端读写就完了。
    `response.setHeader( 'Set-Cookie', 'cookiename=httponlyTest;Path=/;Domain=domainvalue;Max-Age=seconds;HTTPOnly' ) `
    这样前端就无法通过`document.cookie`获得该 cookie 了，这样可样有效的方式`xss`攻击了，可以通过浏览器查看`cookie`的`httpOnly`情况。
- **不必要的流量损失**：后台设置了`set-cookie`，那么以后每个 `HTTP` 请求都会带 `cookie`。
  - 静态文件的请求，也会携带携带`cookie`,这毫无意义
    - 通过 cdn（存储静态文件的）的域名和主站的域名分开来解决
