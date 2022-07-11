<describe>
  title: 强话一波React  Router v6，我开发一个助手库R6helper
  cover: 128a8d6c3be5416ba30b8243fed7eb4f_tplv-k3u1fbpfcp-zoom-1.png
  subhead: 辅助强化 React-router v6 的功能
  date: 2022/4/3
  tags: react
</describe>

<p align="center">
 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/128a8d6c3be5416ba30b8243fed7eb4f~tplv-k3u1fbpfcp-zoom-1.image" alt="favicon-x128.png" border="0" />
</p>
<h1 align="center">R6helper</h1>


# R6helper
![ezgif.com-gif-maker.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/319fe66446a8424da83570555ea162a9~tplv-k3u1fbpfcp-zoom-1.image)
## 安装
```js
npm i r6helper -S
// 或者
yarn add r6helper
```

**辅助强化 React-router v6 的功能，其中主要包括：**

1. 路由守卫：useGuard
2. 全局路由监听： handleHistoryChange
3. 提供 Hoc：withRouter
4. 提供 Hook：useHashs&useSearchs
5. 提供 Provier：R6Provider
6. 提供 Hook：useGo

*(下面根据技术点编号，进行组合或单独介绍)*
## 路由守卫和监听的开发攻略-[1,2,5]组合

1. 在`Router`内部的最顶层，用`R6Provider`包裹一下，其本质是一个`Provider`，其作用就是为后续功能提供支持

```js
import { R6Provider } from "r6helper";
...
<BrowserRouter>
    <R6Provider
        handleHistoryChange={(data) => {
            console.log("global handleHistoryChange");
        }}
    >
        <App />
    </R6Provider>
</BrowserRouter>
```

**R6Provider 提供的配置项：**

-   `handleHistoryChange`：全局监听路由变化的回调函数，统一整合了`pushState`和`popState`监听这两种情况，并通过传入回调函数的参数进行区分，参数大体如：

```Ts
    {
        eTag: string;              // 事件类别： 区分是pushState(或replaceState)触发的还是popState监听的
        hash: string;
        pathname: string;
        search: string;
        popEvent?: PopStateEvent;   // 如果是popState监听，那么就传入PopStateEvent
    }
```

2. 在页面中使用`useGuard`

```js
import { useGuard } from "r6helper";
...
const [guardFlag, setGuardFlag] = useState(true);

useGuard({
    preGuardHandler:()=>{
        // 判断是否拦截
        return true
    },
    guardedListener: ({ url, callFunc }) => {
        console.log("响应拦截拦截回调");
        if (window.confirm(`Are you sure you want to go to 123 ${url}?`)) {
          callFunc();
        }
    }
},[guardFlag])
```

**useGuard 提供的配置项：**

-   `preGuardHandler`：守卫函数，提供三种形态


A-返回`boolean`的函数

B-返回`boolean`的`Promise`

C-返回 B 样子的`Promise`的函数


-   `guardedListener`：拦截回调，

```Ts
    {
        url，               //拦截的目的地的url
        callFunc           // 放行回调
    }
```

与全局监听函数的区别就是没有`PopStateEvent`

## 为组件提供获得和操作路由能力 -[3,4]组合

向组件（函数组件或是类组件）注入 `router` 对象

类组件

```js
class Demo extends React.Component {
	render(): React.ReactNode {
		const {
			router: { location, navigate, params, hashs, changeHash },
		} = props;
		return <div>demo</div>;
	}
}
withRouter(Demo);
```

函数组件

```ts
withRouter((props) => {
	const {
		router: { location, navigate, params, hashs, changeHash },
	} = props;
	return <div></div>;
});
```

**router 对象**的结构如

```ts
export interface WithRouterPropsT {
	location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
    hashs: HashsT;
    changeHash: ChangeHashsT;
    searchs: SearchsT;
```

hashs,changeHash 内部使用 **useHashs**来提供，同时`useHashs` hook 也支持独立使用
searchs 内部使用 **useSearch**来提供，同时`useSearch` hook 也支持独立使用


## 想去哪就去哪，无论你在哪 useGo-[6]

组件内部

```js
const go = useGo();
go("路由地址",{replace:false,state:{}})
```

非组件

```js
import{ goto } from "r6helper";
goto("路由地址",{replace:false,state:{}})
```
## 单元测试

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ff86fb24dd9424e984b05a5b68e6e94~tplv-k3u1fbpfcp-watermark.image?)
em~~~ 有问题欢迎留言讨论，助人我是认真的。