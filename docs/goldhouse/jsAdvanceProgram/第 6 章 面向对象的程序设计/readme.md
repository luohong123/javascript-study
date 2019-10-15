---
{ 'title': '第 6 章 面向对象的程序设计' }
---

# 第 6 章 面向对象的程序设计

<img src="https://github.com/luohong123/js-advance-program/blob/master/%E7%AC%AC%206%20%E7%AB%A0%20%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/%E7%AC%AC%206%20%E7%AB%A0%20%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1.png" />

# 一、理解对象属性

## （一）属性类型

### 1、数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。
（1）数据属性

- Configurable：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特
  性，或者能否把属性修改为访问器属性。

- Emunerable：表示能否通过 for-in 循环返回属性。

- Writable：表示能否修改属性的值。

```javascript
var obj = {}
Object.defineProperty(obj, 'name', {
  writable: false, // 设置为false 不可以修改属性值
  value: 'honghong'
})
obj.name = 'qingcheng'
console.log(obj.name) // honghong
```

- Value：包含这个属性的数据值。读取属性值的时候，从这个位置读;写入属性值的时候，
  把新值保存在这个位置。

# 二、理解创建对象

## （一）工厂模式

```javascript
function createPerson(name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function() {
    alert(this.name)
  }
  return o
}
var person1 = createPerson('Nicholas', 29, 'Software Engineer')
var person2 = createPerson('Greg', 27, 'Doctor')
alert(Object.prototype.toString.call(person1)) // [object Object]
```

- 优点
  可以无数次的调用这个函数，创建了多个相似对象的问题
- 缺点
  没有解决对象识别的问题，不知道一个对象的类型

## （二）构造函数模式

- 构造函数模式与工厂模式的不同之处在于

1. 没有显式地创建对象。
2. 直接将属性和方法赋给了 this 对象。
3. 没有 return 语句。

- 调用构造函数过程

1. 创建一个新对象。
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象)。
3. 执行构造函数中的代码(为这个新对象添加属性)。
4. 返回新对象。

- 优点

- 缺点

## （三）原型模式

- 优点

- 缺点
  如不同的实例对象修改引用类型的值会相互影响，如下代码：

```javascript
function Person() {}
Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  friends: ['Shelby', 'Court'],
  sayName: function() {
    alert(this.name)
  }
}
var person1 = new Person()
var person2 = new Person()
person1.friends.push('Van')
alert(person1.friends) //"Shelby,Court,Van"
alert(person2.friends) //"Shelby,Court,Van"
alert(person1.friends === person2.friends) //true
```

由于共享的本质，修改了 person1.friends 引用的数组，向数组中添加了一个字符 串，导致 person2.friends 共享了 prototype 中的 friends 属性，值也被修改了。

## （四）组合使用构造函数模式和原型模式

```javascript
function Person(name, age, job) {
  // 在构造函数中定义实例的属性
  this.name = name
  this.age = age
  this.job = job
  this.friends = ['Shelby', 'Court']
}
Person.prototype = {
  constructor: Person, // 在原型中定义实例共享的属性 constructor
  sayName: function() {
    alert(this.name)
  }
}
var person1 = new Person('Nicholas', 29, 'Software Engineer')
var person2 = new Person('Greg', 27, 'Doctor')
person1.friends.push('Van')
alert(person1.friends) // "Shelby,Count,Van"
alert(person2.friends) // "Shelby,Count"
alert(person1.friends === person2.friends) // false
alert(person1.sayName === person2.sayName) // true
```

- 优点

- 缺点

## （五）动态原型模式

```javascript
function Person(name, age, job) {
  //属性
  this.name = name
  this.age = age
  this.job = job
  // 方法
  if (typeof this.sayName != 'function') {
    // 检查初始化之后应该存在的任何属性或方法,检查其中一个即可
    Person.prototype.sayName = function() {
      alert(this.name)
    }
  }
}
var friend = new Person('Nicholas', 29, 'Software Engineer')
friend.sayName()
```

> 注意： 使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。

- 优点

- 缺点

## （六）寄生构造函数模式

- 优点

- 缺点

## （七）稳妥构造函数模式

- 优点

- 缺点

# 三、理解继承

## （一）原型链

在理解原型链之前我们需要理解一下什么是指针。

自己使用 proxy 来实现一个原型链吧！加深对原型链的理解，如下代码：
这个是最初级的实现方式：

```javascript
var obj = Object.create(null)
function reviewProto(object) {
  return new Proxy(object, {
    getPrototypeOf(object) {
      return proto
    }
  })
}
console.dir(reviewProto(obj))
```

下面是另一个版本的实现，通过 Object.assign 把传人的构造函数 放到一个 Object.create(null) 里面，这个里面没有原生的原型，如果构造函数里面本身有的属性 就直接去本身找，如果本身没有，定义重写对象的属性（类似深拷贝），去重写的原型里面去找

```javascript
function _new(constructor) {
  return new Proxy(Object.assign(Object.create(null), new constructor()), {
    get(target, key) {
      if (key in target) {
        return target[key]
      } else {
        const reviewProto = constructor.reviewProto || Object.create(null)
        return reviewProto[key]
      }
    }
  })
}

function aaa() {
  this.a = 1
}
var obj = _new(aaa)
obj.reviewProto = { b: 2 }
console.dir(obj)
```

## （二）借用构造函数继承

```javascript
function parentType(name, age) {
  this.name = name
  this.age = age
}
function sonType() {
  parentType.call(this, 'honghong', 18) // 通过调用父构造函数的 call 方法来实现继承
  this.age = 20 // 覆盖了父级的 age 属性
}
var instance = new sonType()
console.log(instance.name) // 'honghong'
console.log(instance.age) // 20
```

- 优点

- 缺点

## （三）组合式继承

```javscript
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue','black'];
}
function Son(name,age) {
  Parent.call(this,name); // 第二次调用Parent()构造函数，创建了name和colors属性，屏蔽了原型中的两个同名属性。
  this.age = age;
}
Son.prototype = new Parent(); // 第一次调用Parent()，将 Parent 的实例赋给 Son 的原型,此时 Son 的 construtor 指向父级的实例
Son.prototype.constructor = Son; // 把constructor 重新指回自己
Son.prototype.sayAge = function() { // 在该新原型 上定义了方法 sayAge()
  console.log('我的年龄是: '+this.age);
}

var instance1  = new Son('honghong',18);
instance1.colors.push('gray');
console.log(instance1.colors); // ["red", "blue", "black", "gray"]
console.log(instance1.name); // honghong
console.log(instance1.age); // 18
console.log(instance1.sayAge()); // 我的年龄是: 18
var instance2 = new Son('qingcheng',10);
console.log(instance2.colors); // ["red", "blue", "black"]
console.log(instance2.name); // qingcheng
console.log(instance2.age); // 10
console.log(instance2.sayAge()); // 我的年龄是: 10
console.dir(Son);
```

- 优点
  继承父级的全部实例属性，同时通过原型可以共享和复用方法
- 缺点
  超过两次调用超类型构造函数，一次是创建子类型原型的时候，一次是在子类型构造函数内部。
  子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。

## （四）原型式继承

ECMAScript5 通过 Object.create()规范化了原型式继承

```javascript
var person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}
var anotherPerson = Object.create(person)
anotherPerson.name = 'Greg'
anotherPerson.friends.push('Rob')
var yetAnotherPerson = Object.create(person)
yetAnotherPerson.name = 'Linda'
yetAnotherPerson.friends.push('Barbie')
alert(person.friends) //"Shelby,Court,Van,Rob,Barbie"
```

- 优点

- 缺点

- 适用场景
  只想让一个对象与另一个对象保持类似的情况下

## （五）寄生式继承

通过借用构造函数来继承属性，通过原型链的混成形式来继承方法

- 实现思路
  不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型 原型的一个副本而已。
  使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

```javascript
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function() {
  alert(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function() {
  alert(this.age)
}
```

- 优点

- 缺点

## （六）寄生组合式模式

- 优点

- 缺点
