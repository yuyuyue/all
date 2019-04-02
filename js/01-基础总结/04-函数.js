/*
  1什么是函数
    实现特定功能的带的代码的封装体
    可以执行的对象
  2为什么要用函数
    提高代码的复用
    便于阅读交流
  3如何定义函数
    函数声明
    表达式
  4如何使用函数
    f();
    obj.f();
    new f();
    f.call/apply(obj) === obj(f)让f成为obj的临时调用 
 */


 function f1(){//声明

 }
 let f2 = function(){//表达式

 }

 let obj = {}
 function test(){
   this.xx = 'yby'
 }
 obj.test();//没有对象，编译报错
 test.call(obj) //obj.test  可以让一个函数成为任意指定对象的方法
 test.apply(obj)//obj.test
 console.log(obj.xx);
 


