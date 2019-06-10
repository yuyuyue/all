export {direction}
export {fileAccess}
// enum 枚举类型定义一些带名字的常量
enum direction{
  up,
  dowm,
  left,
  right
}//当没有初始化时，默认从上一个值开始自增长
// 常量枚举
var a = 'a'
enum fileAccess{
  number = 1,
  string = 'string', // 字符串，数字
  a = 'a',//引用常量
  // G = "123".length
}
// 指定其他类型

