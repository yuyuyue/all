/*定义
  The let statement declares a block scope local variable, optionally initializing it to a value.
  let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

  语法
  let var = [value]
  var 变量名
  value 任何数据类型

  特点
  1；let使得声明的变量固定在当前作用域(变量、语句,表达式,函数)
  2；不可以被提升
  3；不可以被覆盖
  4；在全局作用域声明是，不可以用全局this调用，不会再Object上创建一个属性
  5；构造私有接口
  6: let后跟一个函数传递的参数时将导致循环内部报错
*/
// 1
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
// 2
console.log(foo); // ReferenceError: foo is not defined
let foo = 2;
// 3
function a() {
  console.log('function');
}
let a = 2;
let a = 0; //TypeError
console.log(a);//'a' has already been declared
//4
let y = 'global';
console.log(this.y); // undefined
// 5 不需要使用函数的闭包，实现私有变量
{
  let privateScope;
  function publicFunction(val){
    this.scope = val;
    privateScope = this.scope;
    return privateScope;
  }
}
var pf = new publicFunction(10);
console.log(pf)//publicFunction { scope: 10 }
console.log(privateScope)//privateScope is not defined

//6
function go(n){
  for (let n of n.a) { // ReferenceError: n is not defined
    console.log(n);
  }
}
go({a:[1,2,3]});