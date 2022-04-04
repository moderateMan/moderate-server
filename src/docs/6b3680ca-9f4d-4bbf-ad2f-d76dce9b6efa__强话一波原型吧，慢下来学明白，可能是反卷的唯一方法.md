<describe>
  title: 强话一波原型吧，慢下来学明白，可能是反卷的唯一方法
  cover: 原型.png
  subhead: “最普通的食材”首选就应该是红宝书了。 
  date: 2022/4/3
  tags: basics
</describe>

# 引言

我深知卷不赢众多大佬，一方面我足够平庸，另一方面我仅仅想把技术当乐趣。出于对美好生活的渴望和理解与**如何能不卷还不被淘汰的现实着想**，我要进行深刻的自省，起初分析应该是自己学的不够快，但**欲速又不达**，后来经过反复思考，我得出一个观点：
> 我快不起来，是不是因为我慢不下去啊

这么一想，我确实有种学啥都能学会，但不扎实还忘的快的毛病。

而踏踏实实，慢慢悠悠的学，虽然看起来“**不紧不慢**”，但确实学的透，学的稳，忘的慢，相比之下**实际上是快的**。

> 快就是慢，慢就是快

em~~~ 我记得有句话

> 高端的美味往往由最普通的食材造就

那么“最普通的食材”首选就应该是红宝书了。

# 理解对象

**书中通过七个点来解析对象**：

1.  属性的类型
2.  定义多个属性
3.  读取属性的特性
4.  合并对象
5.  对象标识及相等判定
6.  增强的对象语法
7.  对象解构

*值得强调的是1,2,3是一组并层层推进的*

 那我们挑干的说说，如果有容易忽视的点就强调一下

## 【1】属性的类型
**属性是啥？**

就是对象的属性，可以被对象访问的数据。（比如`let obj = {a:1}`a就是属性）。

属性存在一个如影随形的**描述符对象**，可以通过调用指定函数获得它（【3】读取属性的特性）。


### 属性的两种类型

**数据属性**：

包含一个保存数据值的位置

值从这个位置读取，也会写入这个位置，也就是下面的`value`特性

有**4**个**内部特性**描述：

	1.  [[Configurable]]：可配置
	2.  [[Enumerable]]：可枚举
	3.  [[Writable]]：可写
	4.  [[Value]]：值

**访问器属性**

不包数据值。

不能直接定义，必须通过`Object.defineProperty()`。（下面会讲）

相反包含了一个获取（getter）函数，和一个设置（setter）函数，不过不是必须的。

读取访问器属性时，就会触发获取（getter）函数，责任就是**必须返回一个有效的值**。

写入访问器属性时，就会触发设置（setter）函数，责任就是**必须要对数据做出修改**。

有**4**个**内部特性**描述：

	1.  [[Configurable]]：可配置
	2.  [[Enumerable]]：可枚举
	3.  [[Get]]：获取函数getter
	4.  [[Set]]：设置函数setter


### 啥是内部特性？

简单讲特性就是用来描述属性的行为的。

属性（`propertype`）有**特征**，这些特征被一个对象描述了，该对象称为描述符对象（下面会讲）。

内部特性组成了这个描述符对象，进而描述属性特征。

**内部特性不能直接访问**

这些特性是被**实现js引擎的规范**来定义的，开发者不能在代码里直接访问这种内部特性。
（想获得需要通过特定的api，`Object.getOwnPropertyDescriptor`下面会讲）

**内部特性是啥样的？**

规范用两个中括号把特性名称括起来，比如 `[[Configurable]]`

**为了方便记忆，内部特性可以分成：**

共有的：数据属性和访问器属性**共同拥有的**。

专属的：数据属性和访问器属性**分别独有的**。

**特性的默认值分为两种情况：**

直接定义：通过字面量方式，直接在对象上定义属性的。（比如`let obj = {a:1}`，这就定义了一个属性`a`）。

函数定义：通过函数如`Object.defineProperty()`定义属性的（下面具体介绍）。

**共有特性**

| 共有特性 | 用处   | 直接定义默认值  |函数定义默认值|
| ----- | --------- | ----------- |----------- |
| `[[Configurable]]`-可配置 | 1. 表示属性是否支持`delete`删除并重新定义<br>2. 标志这个属性的**特性**，是否可以修改<br>3. 是否可以把它改成访问器属性  | `true` | `false`|          
| `[[Enumerable]]`-可枚举  | 表示属性是否可以通过`for-in`循环返回     | `true` |`false`|


**专属特性**

*专属数据属性：*

| 共有特性 | 用处   | 直接定义默认值  | 函数定义默认值|
| ----- | --------- | ----------- |----------- |
| `[[Value]]`-数据值 | 属性实际的值  | `undifind` |        
| `[[Writable]]`-可写  | 属性的值（上面说的特性`Value`的值），是否可被修改    |`true`| `false` |


*专属访问器属性：*

| 共有特性 | 用处   | 直接定义默认值  |
| ----- | --------- | ----------- |
| `[[Get]]`-获取函数getter | 属性被读取时调用，可以用作监听  | `undifind` |        
| `[[Set]]`-设置函数setter | 属性被写入时调用，可以用作监听  | `undifind`|

### 描述符对象 (descriptor)

由内部特性组成的，用来描述属性的对象，比如：

**数据属性的的描述符对象：**
```js
    { 
        configurable:true,
        enumerable:true,
        writable:true,
        value:1
    }
```

**访问器属性的描述符对象：**
```js
    {
        configurable:true,
        enumerable:true,
        get(){
            return this.year_;
        },
        set(){
            this.year_ = newValue
        }
    }
```

*注意： 描述符对象中不能混用专属特性，即专属数据属性的特性不能和专属访问器属性的一起出现在一个描述符对象中*。

## 【2】 定义属性

了解完了“是什么”，我们接下来了解“怎么定义”。

**定义属性有两种方式：**
1. 直接定义：在对象上直接定义属性。(这种方式最常见)。
2. 函数定义：通过调用api的方式，接下来我们重点说说。

**两个api:**

`Object.defineProperty`：定义单个属性。

`Object.defineProperties`：定义多个属性。

### Object.defineProperty

**接受三个参数：**

1. 要为之添加或修改属性的目标对象。
2. 属性名（字符或者符号）。
3. 描述符对象。

代码如下：
```js
	Object.defineProperty(book,'Name',{
		writable:false,
		value:"test"
	})
```

### Object.defineProperties

**接受两个参数：**

1. 要为之添加或修改属性的目标对象。
2. 由**描述符对象(descriptor)**组成的对象，其属性与要添加和修改的属性一一对应。

代码如下:
```js
	let book = {};
	Object.defineProperties(book,{
		day:{ 
			value:1
		},
		year_:{
			value:2017
		},
		year:{
			get(){
				return this.year_;
			},
			set(){
				this.year_ = newValue
			}
		}
	})
```

*结合上面的知识点，我们具体分析一下代码~~~*

### 数据属性的定义

`day`和`year_`就是数据属性，因为实现了专属特性`[[Value]]`。

**需要特别注意的点：**
1. 在调用`Object.defineProperty`时，没有指定`configurable`，`enumerable`，`writable`值，则都默认为`false`。
2. 既然`[[Writable]]`为`false`了，那么如果对其描述的属性进行赋值写入，严格模式，会抛出错误，非严格模式，则忽略。
3. 既然`[[Configurable]]`为`false`了，那么如果对其描述的属性调用`delete`，严格模式，抛出错误，非严格模式，无效果，而且当设置成了不可配置之后，就**不可变回可配置**了，这点要注意。

### 访问器属性的定义

`year`属性就是访问器属性，因为实现了专属特性`[[Get]]`和`[[Set]]`。

其中**不包数据值**，数据值是通过调用另外一个数据属性`year_`获得的。

**需要特别注意的点：**
1. `[[Get]]`特性和`[[Set]]`特性不一定都要定义，只定义`[[Get]]`特性，意味着属性是只读的，非严格模式下，尝试修改会被忽略，严格模式下，会报错，**这种行为类似`[[Writable]]`的作用**。
2. 只定义`[[Set]]`特性，意味着属性是不可读取的。

## 【3】读取属性的特性

既然了解“是什么”，“怎么定义”，那么自然就该讲到“怎么取”。

**两个api:**

`Object.getOwnPropertyDescriptor`：获得单个属性。

`Object.getOwnPropertyDescriptors`：获得多个属性。

### Object.getOwnPropertyDescriptor

先说下函数签名~~

**接受两个参数：**

1. 要为之添加或修改属性的目标对象。
2. 要取得其描述符对象(descriptor)的属性名（字符或者符号）。

**返回一个对象：**

对于数据属性，返回的对象包括属性 `configurable`,`enumerable`.`writable`,`value`。

对于访问器属性，返回的对象包括属性 `configurable`,`enumerable`.`get`,`set`。


### Object.getOwnPropertyDescriptors

**接受一个参数：**

1. 要为之添加或修改属性的目标对象。

**返回一个对象**

这个方法实际上就是在每个自有属性上调用了`Object.getOwnPropertyDescriptor`，然后那放回的结果组成一个新对象返回。

### 代码如下

```js
	// 创建一个book对象，并且定义其属性的描述符对象
	let book = {};
	Object.defineProperties(book,{
		day:{ 
			value:1
		},
		year_:{
			value:2017
		},
		year:{
			get(){
				return this.year_;
			},
			set(newValue){
				this.year_ = newValue
			}
		}
	});
	
	// 获得描述符对象
	let descriptor = Object.getOwnPropertyDescriptor(book,'year_')
	let descriptors = Object.getOwnPropertyDescriptors(book)
	console.log(descriptor)
	/**
	{
		"value": 2017,
		"writable": false,
		"enumerable": false,
		"configurable": false
	}
	**/
	console.log(descriptors)
	/*
	{
		"day": {
			"value": 1,
			"writable": false,
			"enumerable": false,
			"configurable": false
		},
		"year_": {
			"value": 2017,
			"writable": false,
			"enumerable": false,
			"configurable": false
		},
		"year": {
			"enumerable": false,
			"configurable": false,
			"get": f(),
			"set": f(newValue)
		}
	}
	*/

```

## 【4】合并对象

`Object.assign`这个api，em~~~很熟了。

### **值得强调的点：**
1. 融合仅仅是可枚举的且是自有的属性，以字符串和符号为键的属性。
2. 合并采用的浅复制，所以别妄想引用类型的属性也能融合，仅仅是覆盖了。
3. 复制访问器属性的时候，会作为静态值赋给目标对象，也就是说访问器属性通过复制会变成数据属性，无法在两个对象间转移获取函数和设置函数。
```js
        let book = {};
	Object.defineProperties(book,{
		year_:{
			value:2017
		},
		year:{
			get(){
				return this.year_;
			},
			set(){
				this.year_ = newValue
			},
            enumerable:true
		}
	})
	let newOne = Object.assign({},book);
	console.log(Object.getOwnPropertyDescriptor(newOne,'year'));  
        // {value: 2017, writable: true, enumerable: true, configurable: true}
```
4. 如果赋值期间出错，那么操作就会中止并退出，同时抛出错误，但不回滚之前已经赋值好的， 可以理解为“**它是一个尽力而为，可能只会完成部分复制的方法**”。

## 【5】 对象标识及相等判定

### Es6之前，“=== ”操作符的无能为力

**对于0：**

```jsx
console.log(+0 === -0) // true
console.log(+0 === 0) // true
console.log(-0 === 0) // true
```

**对于NaN：**

```jsx
// 作者强调了Es6之前，为了确定NaN的相等性，必须使用极为讨厌的isNaN
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
```

### Es6之后,`Object.is` 替代“=== ”

```jsx
console.log(Object.is(+0,-0)) // false
console.log(Object.is(+0,0)) // true
console.log(Object.is(-0,0)) // false

console.log(Object.is(NaN,NaN)) // true

```

## 【6】增强的对象语法

语法糖 没有改变现有引擎行为 极大的提升了处理对象的方便程度

### 1. 属性值简写

**传统的写法：**

```jsx
let name = 'test';
let person = {
	name:name
};
```

**用特性改写：**

```jsx
//可以简写为
let person = {
	name
};
```

### 2. 可计算属性

**传统的写法：**

```jsx
const nameKey = 'name';
const person = {};
person[nameKey] = 'test';
```

**用特性改写：**

```jsx
const nameKey = 'name';
let flag = 0;
function getUniqueKey(key){
		return `${key}_${flag++}`
}
const person = {
	[nameKey] : 'test',
  [getUniqueKey(nameKey)]:'test'
}
```

### 3. 简写方法名

**传统的写法：**

```jsx
const person = {
	sayName : function(name){
			console.log(name);
	}
}
```

**用特性改写：**

```jsx
const person = {
	sayName(name){
			console.log(name);
	}
}
```

**与可计算属性组合兼容：**

```jsx
const nameKey = 'name';
let flag = 0;
function getUniqueKey(key){
    return `${key}_${flag++}`
}
const person = {
    [nameKey](){},
    [getUniqueKey(nameKey)](name){
        console.log(name);
    },
}
```

## 【7】对象解构

> 对象结构就是使用与对象匹配的结构实现对象属性赋值

**传统的写法**

```jsx
let person = {
	name:"test",
	age:18
};
let personName = person.name,
personAge = person.age;
console.log(personName); // test
console.log(personAge); // 18
```

**使用对象解构改写**

```jsx
let person = {
	name:"test",
	age:18
};
const {name:personName,age:personAge} = person;
console.log(personName); // test
console.log(personAge); // 18
```

以上是通过解构取值并设置了别面，本质就是执行了多个赋值操作。

如果想要直接使用属性名称，那么可以简写为：

```jsx
const { name, age } = person;
```

⚠️**值得注意的点：**

**解构赋值的属性如果不与对象匹配的话，会怎么样？**

解构赋值的时候会忽略不匹配的属性，并且这些属性的值为`undifind`。
比如：
```js
const a = {b:{c:1}}
const {d} = a;
console.log(d) // undifind
```

**怎么防止解构的属性值为空呢？**

给默认值啊

```jsx
const a = {b:{c:1}}
const {d='d'} = a;
console.log(d) // d
```

接下来说说，衍生的三个关键知识点～～～

### 嵌套解构

```jsx
const a = {b:{c:'c'}};
const {b:{c,d='d'}} = a;
console.log(c) // 'c'
console.log(d) // 'd'
```



### 部分解构

> 如果解构赋值涉及了多个赋值，开始的赋值成功后面的赋值出错，则赋值只会完成一部分

```jsx
let person = {
    name:'test',
    age:27
}
let personName,personBar,personAge;
try {
    ({name:personName,foo:{bar:personBar},age:personAge} = person)
} catch(e) {
    console.log(e)  
    //TypeError: Cannot read properties of undefined (reading 'bar') at <anonymous>:7:29
}
console.log(personName,personBar,personAge) 
// test undefined undefined
```

### 函数参数解构赋值

```jsx
let person = {
    name:'test',
    age:18
}
function test({name:personName,age,level=2}){
    console.log(personName) // 'test'
    console.log(age) // 18
    console.log(level) // 2
}
test(person);
```

## 暗线回收

通过理解对象之后，我们可以很方便的通过对象字面量来创建对象。

但是如果这种创建方式没有问题，没有不足，又是怎么引出下面创建对象呢？

**字面量定义对象的问题：**

创建同样接口的多个对象需要重复编写很多代码

em~~~ 就是**代码重复**的问题。

# 创建对象
## 工厂模式

这是一个众所周知的设计模式，用于抽象创建特定对象的过程。

工厂模式创建对象的过程，可以简单理解为： 

**使用一个函数，然后函数内部就是创建组装一个全新的对象，并返回。**

```js
function createPerson(name){
	let key = Date.now();
	let obj = new Object();
	obj.name = name;
	obj.sayName = function(){
		console.log(this.name);
		console.log(key);
	}
	return obj;
}
let person1 = createPerson('test')
```
🤔思考一下，这么眼熟，在哪见过？来让我们看看下面这段

```js
let person1 = (function createPerson(name){
	let key = Date.now(); 
	let obj = new Object();
	obj.name = name;
	obj.sayName = function(){
		console.log(this.name);
		console.log(key);
	}
	return obj;
})()
```
em～～～，这不是闭包，函数自调用么，实际上整个函数创建对象实例的过程，闭包无处不在，但只能点到为止，不能展开讲，留个伏笔。

### 工厂模式的问题

虽然解决了创建了多个差不多样子对象的问题，但是没有解决对象标识的问题（即新创建的对象是什么类型）

## 构造函数模式

构造函数是用来创建特定类型对象的即**实例**。 比如`Object`和`Array`这种是原生构造函数。 

当然也可以自定义构造函数，随便创建一个函数就可以作为构造函数使用。

```js
function createPerson(name){
	this.name = name;
	this.sayName = function(){
		console.log(this.name);
	}
}
let person1 = new createPerson('test1')
let person1 = new createPerson('test2')
```

### **解决工厂模式的问题：**

这样就可以通过`constructor`和`instanceof` 来解决实例对象的标识问题。

```js
console.log(person1.constructor === createPerson); // true
console.log(person1 instanceof createPerson); // true
```

### 构造函数模式的问题

**问题：**

主要的问题在于，每构建一次实例，就是在执行相同的逻辑，重复地创建属性和函数。 以前面的例子而例，`person1`和`person2` 虽然拥有几乎相同的样子，但引用类型的数据**同名却不相等**，比如都有的函数`sayName`，就是不同的对象即`Function`实例。

```js
console.log(person1.sayName === person2.sayName); // false
```

**构造函数模式的解决方案:**

那么把函数提高作用域到全局，然后在构造函数中使用这个全局函数进行定义不就行了。

```jsx
let sayName = function(){
		console.log(this.name);
}
function createPerson(name){
	this.name = name;
	this.sayName = sayName;
}

console.log(person1.sayName === person2.sayName); // true
```

**引出的新问题：**

虽然解决了相同逻辑创建导致函数重复定义的问题，但是全局作用域被搞乱了，毕竟函数仅仅是实例的，没资格提到全局，而且这还导致定义实例的相关逻辑分离了，不聚集，不方便维护。

**思考：**

如何能够解决函数重复定义，又能够不必分离函数定义到全局，尽可能地聚集在一起呢？

**em~~~原型了解一下**

## 原型模式

每创建一个函数都会创建一个`prototype`属性，这个属性是一个对象，通过它可以让每一个被这个函数创建的对象，共享相同的属性和方法。

这样就给原型定义一些属性和方法不就行了。（为了理解这个过程，可以看下我的下一篇关于原型的文章）。

```jsx
function Person(){}
Person.prototype.name = 'test';
Person.prototype.sayName = function(){
    console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();
person1.sayName(); // "test"
person2.sayName(); // "test"
console.log(person1.sayName === person2.sayName); // true
```

这样构造函数的问题就解决了。

### 原型模式也不是没有问题
构造函数来重复定义一个实例对象的属性和函数能够保证，每一个实例对象的属性和函数都是独一无二的。

但是原型模式弱化了这一点，取而代之的是所有的实例对象都共同拥有相同的属性和函数，即原型的属性是在实例间共享的。

**那么改一个原型就会影响全部的实例对象。**

**所以极端地使用原型模式，忽略构造函数传参构建实例的方式，不可取。**


## 暗线回收

那么梳理一下，以**创建对象为**切入点进行展开，从**工厂模式**存在不能标识被创建对象的类型，再演进到使用**构造函数模式**来解决，但其又纯在重复创建和分离函数定义污染全局等问题，进而推导出使用**原型模式**。

至此，我们已经从**理解对象**和**创建对象**两个层面好好地**强话了对象**。

从而为引出的两个关键的角色：**原型和构造函数**做好了铺垫。


那么下一篇，我们**强话一下**原型和构造函数，好好地把原型问题给吃透。
# 深入分析原型

回顾一下原型模式的写法

```jsx
function Person(){}
Person.prototype.name = 'test';
Person.prototype.sayName = function(){
    console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();
person1.sayName = ()=>{}
person1.sayName(); // "test"
person2.sayName(); // "test"
console.log(person1.sayName === person2.sayName); // true
```

## 每创建一个函数，都会连带创建一个新对象
无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个`prototype`属性（指向原型对象）

即：`Person.prototype`指向**原型对象**

默认情况下，所有的原型对象自动获得一个名为`constructor`的属性，指回与之关联的构造函数。

```js
console.log(Person.prototype.constructor == Person) // true
```

每次通过`new`调用构造函数创建的实例，其内部`[[Prototype]]`指针就会被赋值构造函数的原型对象。在浏览器中我们可以通过实例的`__proto__`属性获得原型对象。

(*脚本中没有获得`[[Prototype]]`特性的标准方式，但浏览器会在某个对象上暴露`__proto__`属性，可以通过这个属性在代码中访问对象的原型。*)
```js
console.log(Person.prototype === person1.__proto__) // true
```

## 隐式原型和显式原型

我们常常管实例的原型指针叫**隐式原型**和函数的原型指针叫**显式原型**这种区分方式。

这两个指针指向同一个原型对象，仅仅是指针名不同而已。

## **关键要理解一点：**
实例与构造函数原型之间有直接关系，但是实例与构造函数之间没有。
简单理解就是，实例的自有属性中没有`constructor`指针能够指向构造函数。
```js
console.log(person1.hasOwnProperty('constructor')) // false
```

## **那么总结一下：**
就是**构造函数**、**原型对象**、**实例**是不同的对象，创建函数就会关联一个原型对象，实例是`new`执行构造函数创建并关联原型对象的，构造函数通过指针`prototype`获得原型，实例通过`__proto__`获得原型。

**实例仅仅与原型对象有直接关系。**

## 原型链
一个对象就有一个隐式原型指针指向一个原型对象。

一个原型对象也是对象啊，所以往上套，直到尽头`null`，那么这就形成了一个链。

```js
console.log(person1.__proto__.__proto__.__proto__) // null
```
再举一个原型链全貌的例子
```js
function A(){}
let a = new A()
function B(){}
// 让B称为a实例对象的构造函数
B.prototype = a
let b = new B()
// 那么b的原型链条 b.__proto__
console.log(b.__proto__ === B.prototype&&
b.__proto__.__proto__ == A.prototype &&
b.__proto__.__proto__.__proto__ === Object.prototype &&
b.__proto__.__proto__.__proto__.__proto__ === null) // true
```

**也就是说任何一个对象都有一个以隐式原型为起点，null为终点原型链。**
`Object.prototype`比较特殊，它的起点和终点重合了，都是null。


## 属性的访问规则
通过对象访问属性时，会在自有属性中找，找不到就在其原型链条中找，找到就返回。


`person1.sayName`就是从`person1.__proto__`中找到的。

```js
console.log(person1.sayName === person1.__proto__.sayName) // true
```

## 属性可以从原型中获得，但可以通过实例直接修改么？
虽然实例可以获得原型对象上的值，但不能重写。

赋值也仅仅等同于在实例本身添加一个与原型对象中同名的属性，形成一个“遮蔽”效果。
比如：

```js
person1.sayName() // 'test'
person1.sayName = ()=>console.log('重写');
person1.__proto__.sayName() // 'test'
person1.sayName() // '重写'
```

## “遮蔽”了原型属性之后怎么清除
使用`delete`操作符，删除实例的自有属性
```js
delete person1.sayName
person1.sayName() // 'test'
```

## 获得自有属性和原型属性的方式
`hasOwnPropertype`和`in`，前者是判断自有后者是判断自有和原型可枚举

组合现有能力，实现一个仅仅可以枚举原型的函数。
```js
function hasProtoProperty(obj,name){
	return !obj.hasOwnProperty(name)&& (name in obj)
}
```
## 仅可以枚举的属性
**自有和原型一起**

`for in`
### 仅自有

`Object.keys`

### 仅原型

使用上面自定义的`hasProtoProperty`

## 所有的属性
**仅自有属性**

使用`Object`的静态方法就行。

`Object.getOwnPropertyNames()`针对属性名为字符的。

`Object.getOwnPropertySymbols()`针对属性名为`Symbol`的。

## 属性枚举顺序
`for in`循环、`Object.keys()`枚举顺序是不确定的，取决于js引擎，因浏览器而异。

`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymols()`、`Object.assign()`是有顺序的。

**顺序的规则**：先是数值键按照升序，然后字符和符号键无论是字面量还是插入方式都是按照先来后到的顺序排的。
```js
let o = {
	2:2,
	jim:'jim',
	1:1,
	tony:'tony'
};
o['lily'] = 'lily';
console.log(o) // {1: 1, 2: 2, jim: 'jim', tony: 'tony', lily: 'lily'}
```

# 深入分析构造函数

回顾一下构造函数的写法

```js
function CreatePerson(name){
	this.name = name;
	this.toDo = function(){
            console.log(this.name);
	}
}
let person1 = new CreatePerson('test')
```

## 构造函数也是函数
> 构造函数与普通函数唯一的区别就是调用方式不同。任何函数只要用`new`操作符调用的就是构造函数。

## 构造函数创建对象有什么不同之处

首先构造函数的写法有工厂模式的影子，但是相比起来，构造函数模式有了一些关键的变化：

- 没有显示地创建对象，取而代之的是使用了`this`
- 属性和方法直接赋值给了这个`this`
- 去掉了`return`，但调用方式变味了`new`调用。

以上就是标准的方式。


## 构造函数的首字母要大写

有个细节值得注意，做构造用的函数，其名的首字母大写了，这是惯例：**构造函数的首字母要大写**，不指定作为构造使用的函数小写开头，当然是函数就有作为构造函数的能力，二者没有什么本质区别，仅仅是规范为了做区分。

## 使用了`new`调用构造函数的方式，都暗自做了哪些操作

1. 在内存中创建了一个新对象，名字就叫“小新”
2. 这个新对象“小新”的内部的`[[prototype]]`特性即**隐式原型**被赋值为这个构造函数的合作伙伴即函数的**显式原型**`prototype`，这种行为简单讲就是认主了：这个新对象“小新”认构造函数的合伙人为造物主了。
3. 构造函数内部的`this`就指向了这个新对象“小新”
4. 完成以上操作，就开始执行函数内部的代码了。
5. 如果构造函数没有return，或者return 一个空值，那么就直接返回这个新对象“小新”。（*如果返回了一个非空引用值，非空引用值哦！，则就强行替代返回这个新对象“小新”，同时就失去了对象标识的能力*）。

那么通过构造函数所创建的全新对象，就是这个“小新”。

**解决了工厂模式存在解决对象标识的问题**

**constructor**
可以通过判断实例的构造函数的值，来判断自己的类型。
```js
console.log(person1.constructor === createPerson) // true
```
实际上我们应该清楚`constructor`是原型的属性。
```js
console.log(person1.hasOwnProperty('constructor')) // false
console.log(person1.__proto__.constructor === createPerson) // true
```
但是有被篡改的可能即重新赋值`constructor`，
```js
person1.__proto__.constructor  = ()=>{}
console.log(person1.constructor === createPerson) // false
```

所以不太可靠

**instanceof操作符**

用法是：
```js
console.log(person1 instanceof createPerson) // true
```

**instanceof操作符**的左侧是一个实例对象，右侧是一个构造函数，这个一定要清楚。

**怎么理解呢？**

先回忆一下原型链：**那么任何一个对象都有一个以隐式原型为起点，null为终点原型链。**

那么结合原型链就可以理解为：

对象的原型链条中有一个对象是这个构造函数的显式原型

```js
function A(){}
let a = new A()
function B(){}
// 让B称为a实例对象的构造函数
B.prototype = a
let b = new B()
// 那么b的原型链条 b.__proto__
console.log(b.__proto__ === B.prototype&&
b.__proto__.__proto__ == A.prototype &&
b.__proto__.__proto__.__proto__ === Object.prototype &&
b.__proto__.__proto__.__proto__.__proto__ === null) // true

console.log(b instanceof B) // true
console.log(b instanceof A) // true
console.log(b instanceof Object) // true
```
# 专注研究对象、构造函数、原型

目前已经深入分析了对象、构造函数、原型。

那么是时候将他们拼成一个整体，以一个宏观的视角来重新认识和理解了。

# 对象、构造函数、原型三位一体

虽然针对对象、构造函数、原型进行了专注研究，但是一遇到具体问题还是会发懵的。

## 一些发懵问题

1. 为什么万物皆为对象呢？
2. 构造器的显式原型对象的`constructor`指向了什么？why？
3. `Function` 的显式原型和隐式原型相等么？why？
4. 所有函数（其中包括所有的原生构造器和所有定义的函数）的隐式原型都相同么？why？
5. 定义函数意味着什么？
6. `**Object.prototype.__proto__`是什么？

## 对象、构造函数、原型放在一起我顿悟了
当我不断专注的研究对象、构造函数、原型，经过反复的理解和推敲，试图将他们拼凑起来形成一个整体来看的时候，我惊喜的的发现很多不好理解的事情都变得合情合理了起来。
我仿佛顿悟了一个道理，如果把**原型**比作**造物主**，**构造函数**比作造物主的**构造器**，把**实例**比作**子体**的话，那么：

> **创建对象的过程，就可以形象的说成造物主使用构造器，繁衍子体的过程。**

为了能够更好把如同魔法般奥妙的概念传达出来，我思考良久，得出一个法子，那就用魔法打败魔法🐶

**因此我提炼了出了六句口诀。**

# 六句口诀
## 混沌初开，万物为空

混沌是一切的开始，没有任何有形的物体存在，有的仅仅是一些基本组成物质的元素。

![Untitled.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b63b891bdaf14c128dc9881109175893~tplv-k3u1fbpfcp-watermark.image?)

## 无中生有，物聚成体

物质经过漫长的碰撞凝聚，渐渐的形成了最原始的元物体。

![ezgif.com-video-to-gif.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6b805fe8c664c228caecdaf84d30b4c~tplv-k3u1fbpfcp-watermark.image?)


## 物体演变，化元为众

元物体不断地演变，分裂出了众多具有不同特征的物体。

![ezgif.com-gif-maker (6).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47f061b07de9440b9e89096371935b5c~tplv-k3u1fbpfcp-watermark.image?)

## 众体灵长，函数生用

在这些众多的物体之中，有个物体产生了灵，因其有了想法，可以对具体要做的事做计划，然后在某个时机被执行，这样便可裁成自身，进而拥有繁衍的能力，成为了生物，称为函数。
![ezgif.com-gif-maker (7).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7419358d2284908bc2c505349a3cbaf~tplv-k3u1fbpfcp-watermark.image?)

## 函数之用，为众造器

函数主动地为众多物体制定了繁衍的方案，并以此对自己进行裁成，繁衍出了多个函数子体，称为构造器。

![ezgif.com-gif-maker (8).gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d47bf008a2d941f49d9e443d4a2044e4~tplv-k3u1fbpfcp-watermark.image?)


## 体用合一，生生不息

当众物体与对应的构造器相结合，就具有了源源不断地繁衍自身的体力。

![ezgif.com-gif-maker (10).gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e45aa935fb5d44509abc1f8ea1fd9c48~tplv-k3u1fbpfcp-watermark.image?)

完整过程：

![all.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9392ba43960a4341a546860d85960bee~tplv-k3u1fbpfcp-watermark.image?)

## 注解
体就是物体，对象比如函数之体就是函数的显式原型。
用就是函数的可以被执行的能力，抽象的如同灵性一般。
体用结合就是构造函数和原型的结合，形成了一个如同种类一般的存在。

我提炼出了一个“公式”，简称为“强式”
```js
如果：
    体A+构造器B => 子体C
那么：
    构造器B.prototype -> 体A
    体A.constructor -> 构造器B
    子体C.__proto__ -> 体A
进而推导出：
    构造器B.prototype.constructor->构造器B
    构造器B.prototype == 子体C.__proto__
```

其实只要清楚记住一件事就行：
> `null`=>对象⇒分化出了函数等众多物体=>函数创建了构造器=>众多物体与对应的构造器结合，然后创建物体

就这么简单，当我再面对原型问题的时候，我就不懵了，而且我不忘了，不用再背了。

# 检验口诀

## 众物体皆为对象么？为什么？
对，皆为对象
```js
let num = new Number(1);
let str = new String("");
let bool = new Boolean(false);
let map = new Map()
let set = new Set()
let obj = new Object()
let arr = new Array()
let func = new Function()

console.log(num instanceof Object &&
str instanceof Object &&
bool instanceof Object &&
map instanceof Object &&
set instanceof Object &&
obj instanceof Object &&
func instanceof Object ) // true
```



**为什么？**

通过口诀：**无中生有，物聚成体，物体演变，化元为众**
null中生出的有，这个“有”起初就是对象，然后继续演变，分生出了众多各具特征的物体，那么万物的起源遍都是对象。

## `Object.prototype.__proto__`是什么？

`Object`的`prototype`是众体之母。因为“无中生有，物聚成体”，无就是`null`

那么`**Object.prototype`的造物主(**即`**__proto__**`)就是**`null`

## 定义函数意味着什么？为什么说每个函数都是构造函数？

定义函数就是创建`Function`实例，比如：

```jsx
// Function实例
function func(){
}
// 近似于
let func = new Function()
```

**每个函数都是构造函数**
每创建一个`Function`实例，就会连带着创建一个`Objcet`实例，二者体用合一，那么这个函数就具备了构造器的作用。

## 所有构造器的显式原型对象的`constructor`指向了什么？why？
指向了构造器本身
```jsx
console.log(
	Object.prototype.constructor === Object &&
	Function.prototype.constructor === Function &&
	Array.prototype.constructor === Array &&
	Number.prototype.constructor === Number &&
	String.prototype.constructor === String &&
	Boolean.prototype.constructor === Boolean &&
	Map.prototype.constructor === Map  
) // true
```
用六字口诀推导：
”**体用合一**“
构造器和对原型对象合体，那么彼此之间就是你中有我，我中有你的关系。

同时通过强式也能得出：
`所有的构造器.prototype.constructor == 构造器B`

“**体用合一**”

## 所有函数（其中包括所有的原生构造器和所有定义的函数）的隐式原型都相同么？why？

```jsx
function func(){
}
console.log(
    func.__proto__ === Object.__proto__ &&
	Object.__proto__ === Function.__proto__&&
	Function.__proto__ === Array.__proto__ &&
	Array.__proto__ === Number.__proto__ &&
	Number.__proto__ === String.__proto__ &&
	String.__proto__ === Boolean.__proto__ &&
	Boolean.__proto__ === Map.__proto__ &&
	Map.__proto__ === Set.__proto__ 
) // true
```
**why？**
用六字口诀中两句推导：

> **“函数之用，为众造器。”**

> **“体用合一，生生不息。”**

所有函数都是函数体用合一创造的子体，那么通过强式可以得出：
`所有函数.__proto__ == 函数之体`

## 原生构造器`Function` 的显式原型和隐式原型相等么？why？

**相同**
```js
console.log(Function.prototype === Function.__proto__) // true
```
**why？**

用六字口诀中两句推导：
> **“函数之用，为众造器。”**

> **“体用合一，生生不息。”**

通过“**为众造器**”可以了解到，构造器和对应的物体对象结合。

那么`Function`构造器就是与函数之体相结合的，那么可以得出。

`Function.prototype === 函数之体`

通过“**体用合一**”可以了解到，所有函数都是函数体用合一创造的子体，那么可以得出。

`所有函数.__proto__ == 函数之体`

# 总结
我们从理解对象，通过字面量创建对象存在的不足，引出了通过函数创建对象的方式，然后通过各种问题推动发展，一步步的演化出了**构造函数和原型**两种创建对象的方式，进而针对二者进行了专注分析，**至此对象，构造函数和原型相关基础已然夯实**，那么再将他们**拼成一个整体**，从一个宏观的视角再去分析和理解，从而内化出一个足够清晰的**概念和理论**，这样再遇到问题的时候，可以用其来解决，做到把**知识学活了**，也就把原型学明白了。

# 题外话
为了能够将内心所理解的概念说清楚，说明白，那简直可以说是“无所不用其极”，当然用如此“传统”的方式介绍技术，多少有点“不入流”，也许会引来嘲笑，没关系的，我们只要确定目的：“**你想懂，我想让你懂**”，那么我们就是道友，未来可能很卷，可能卷到没朋友，但能够应对这一切，共同进步的唯一方法，就是互相搀扶，这点我深信不疑。
