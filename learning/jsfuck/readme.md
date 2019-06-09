### jsfuck

- 原理：https://segmentfault.com/a/1190000008038678
- []
  'abc' [ 0 ]      //得到单个字母 
  [] [ 'length' ] // get property 
  [] [ 'fill' ]    //获取方法

- +
  + [] // 0  - 数字0
  [] [[]]  //undefined [] 0 +[] 
  + undefined
  +[ [+!+[]] + [+[]]] // '1' + '0'
  [] ['find'] //function find() { [native code] }

- !
  