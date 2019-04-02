/*
  1什么是对象
    多个数据的封装题
    用来保存多个数据的容器
    一个对象 => 一个事物
  2为什么要用对象
    管理多个数据
    减少变量数目
  3对象的组成
    属性： 属性名(String)和属性值(任意)   
    方法： 属性值是函数
  4如何访问对象
    .属性名:方便 有时不可以用 
      属性名包括特殊字符 - 空格
      属性名不确定
    ['属性名']: 找到在'属性名'，如果没有就会创建
*/

let obj = {
  name: 'tom',
  age: 12,
  setName: function (name) {
    this.name = name;
  }
}

obj.setName('yby');
obj['setName']('aaa');

//age属性是变量，在右边,
let propage = 'age';
console.log(obj.propage);
console.log(obj[propage]);

let b = {};
b.c = 10;
let a = 'c';
console.log(b.a);
console.log(b[a]);

var customer = {};
var addr = ['北京', '上海', '广州', '深圳'];
for (i = 0; i < 4; i++) {
  customer["address" + i] = addr[i];
}
console.log(addr);
console.log(customer);
var str = "";
for (i = 0; i < 4; i++) {
  str += customer["address" + i] + "\t";
}
console.log(str);

