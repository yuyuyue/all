

/*  
分类
  基本(值)类型
    String: 任意字符串
    Number: 任意的数字
    boolean: true/false
    undefined: undefined
    null: null
  对象(引用)类型
    Object: 任意对象
    Function: 一种特别的对象(可以执行)
    Array: 一种特别的对象(数值下标, 内部数据是有序的)
判断
  typeof: 返回字符串表达式 String类型
    可以判断: undefined/ 数值 / 字符串 / 布尔值 / function
    不能判断: null与object  object与array
  instanceof: 
    instanceof(可以实例化的)判断对象的具体类型
  ===
    可以判断: undefined, null
*/
/*
  1.什么时候使用null ： 初始化，回收内存
  2.数据类型和变量类型 
    数据类型是基本类型和对象类型 
    变量类型是变量存的值的类型 ：基本类型，引用类型
  3.函数与对象的区别：函数内写的是可执行的代码
  

*/

  let a;
  console.log(a);//undefined 
  console.log(typeof a); //undefined 

  let b = 0;
  console.log(b);//0
  console.log(typeof b);//'number'

  console.log(0 === null); //false

  let c = false
  console.log(c);//false
  console.log(typeof c);//boolean
  
  let d = null;
  console.log(typeof d);//object 只能判断为obj

  let f = {
    f1: function(){
      return 'f1'
    },
    f2: ['f2']
  }
  
  console.log(f);//{ f1: [Function: f1], f2: [ 'f2' ] }
  console.log(typeof f);//object
  console.log(f instanceof Object);//true
  
  console.log(f.f1);//[Function: f1]？
  console.log(typeof f.f1);//function
  console.log(f.f1 instanceof Function);//true
  
  console.log(f.f2);//[ 'f2' ]
  console.log(typeof f.f2);//object
  console.log(f.f2 instanceof Array);//true
  
  
  
    
