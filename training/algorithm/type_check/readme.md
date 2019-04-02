## 类型 typeof
- 复杂数据类型 object
  Array 可以用遍历的对象
  Function 可以执行的对象
  JSON 可以枚举的对象
  问题：
  typeof 无法区分json []
  有一个方法可以区分Array 
  Object.prototype.toString.call()
1. 用对象字面量来面向对象，区别原型式的，他没有被实例化的需要 Type.jiang'将在程序中就做这个事情
   var Type = {}

2. 使用for一次性加完 同步异步
   使用闭包来将type作用域封闭起来，立即执行函数，同步执行，类型检测函数的定义，函数嵌套函数，形成闭包
   当函数在被调用，找到定义的type
3. Object.prototype.toString.call()
   Object 顶级对象
   原型有toString可以得到类型参数"[object object]"
   [object Array]方法的执行方式改变

  