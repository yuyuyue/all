export var a = ''
export function foo(){}
export interface srting{}
// export 导出 模块的任何东西
export * from "./枚举" //重新导出不会在当前模块导入那个模块或定义一个新的局部变量。
// as 别名
class module{}
export {module as m}
// default 默认导出


import {direction} from "./枚举" //导入导出的名字都是需要{}
let dir = direction
import * as all from './枚举'//全局导入
import './枚举'//全局导入
import val from './mydeclare' //var 默认为$

// export= + import module = require('path')也可以表示导入导出

// 导入js的库 .d.ts

// 注：module 应该使用 namespace来代替
