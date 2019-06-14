/*
  Buffer(缓冲区)
    - Buffer的结构和数组很像，操作的方法也和数组类似
    - 数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据
    - 使用buffer不需要引入模块，直接使用即可
    - 在buffer中存储的都是二进制数据，但是在显示时都是以16进制的形式显示
      buffer中每一个元素的范围是从00 - ff   0 - 255
      00000000 - 11111111

      计算机 一个0 或一个1 我们称为1位（bit）

      8bit = 1byte（字节）
      1024byte = 1kb
      1024kb = 1mb
      1024mb = 1gb
      1024gb = 1tb

      buffer中的一个元素，占用内存的一个字节

    - Buffer的大小一旦确定，则不能修改，Buffer实际上是对底层内存的直接操作

*/


// var str = 'yby yue 严'
// var buf = Buffer.from(str)
// console.log(buf)
//  console.log(Buffer)
// console.log(buf.length)
// console.log(str.length)

// var buf1 = Buffer.alloc(10)
// console.log(buf1)

var buf2 = Buffer.allocUnsafe(10)
console.log(buf2)
// 所有number类型的在控制台都是以十进制输出
console.log(buf2[3].toString(16)) 

var str = '我是一段文本'
var buf3 = Buffer.from(str)
console.log(buf3.toString())