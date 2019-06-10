// 引入第三方库是需要引用他的声明才能获得代码提示。接口补全等功能
// 引入jQuery
declare var $:(selctor: string) => any
$('#foo')
// declare var 定义了$的类型，而没有定义对象
// 声明文件应该单独放在一个文件中xxx.d.ts 声明文件必须以.d.ts结尾
