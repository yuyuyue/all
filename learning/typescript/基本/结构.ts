// 库
// 全局库 全局库是指能在全局命名空间下访问的（例如：不需要使用任何形式的import）
// 识别

// 全局库的源代码
/*
顶级的var语句或function声明
一个或多个赋值语句到window.someName
假设DOM原始值像document或window是存在的
*/

// 模块化库 一些库只能工作在模块加载器的环境下
// 识别
/*
无条件的调用require或define
像import * as a from 'b'; or export c;这样的声明
赋值给exports或module.exports
*/

// UMD UMD模块是指那些既可以作为模块使用（通过导入）又可以作为全局（在没有模块加载器的环境里）使用的模块
// typeof define，typeof window，或typeof module这样的测试，尤其是在文件的顶端，那么它几乎就是一个UMD库。

// 依赖
// 如果你的库依赖于某个全局库，使用/// <reference types="..." />
// /// <reference types="someLib" />

// function getThing(): someLib.thing;

// 如果你的库依赖于模块，使用import语句
// import * as moment from "moment";

// function getThing(): moment;

// 