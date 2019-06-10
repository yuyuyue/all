//  使用 let varibale : (string, boolean, number, null, undefined, object)来绑定数据类型，不允许修改
//  使用 any 可以使用任意类型，为声明类型就是任意类型
//  赋值的没有指定类型，ts会自动判断， 只有声明时，则为any，且不会改变
//  使用 | 表示联合赋值， 如 number | string
// interface 接口可以对类进行抽象，也可以用来指定object类型
interface Person{
  readonly name : string 
  age? : number
  [propName : string] : any
}

let person : Person = {// 变量中的属性必须和接口的保持一致
  name : 'yby',
  age : 13
}

// 当需要接口中的属性为可选时 需要在属性名后加?，如 name? : string
// 需要使用接口未定义的属性需要添加 [propName : string] : any 并且当设置任意属性，其他属性必须被任意属性包含
// readonly 将属性设置为只读，只能使用创建的值，不可以被修改
// 数组类型 number[]  数组范型 Array<number>  any[] 相当于 js []
// 函数
// 函数声明
function sum(x : number, y : number) : string{
  return x + y + ''
}
// 函数表达式 =>表示函数的定义，左边是输入类型，右边是输出类型
let mysum: (x : string, y : number) => string
  = function (x : string, y : number): string{
    return x + y
  }
// 接口定义函数
interface sum{
  (x: string, y: number): boolean
}
let sum1: sum = function(x: string, y: number): boolean{
  return x + y === '1'
}
// 这样绑定变量类型，可以实现重载?
function sum2(x: number): number
function sum2(x: string): string 
function sum2(x: number | string): number | string//最后一次是函数实现，类型需要有前面定义的函数 不加这个报错
{
  if (typeof x === 'string'){
    return x
  }else if (typeof x === 'number'){
    return x
  }
}
// 类型断言 <类型> || as 类型  tsx需要使用as 手动指定类型的值
function getLength(str: number | string): number{
  if((str as string).length){ // (<string> str).length
    return (str as string).length
  }else{
    str.toString().length
  }
}


