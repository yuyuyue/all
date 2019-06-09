
var Type = {}
//立即执行函数是闭包的温床 
//
for (var i = 0, type; type = ['String', 'Array', 'Number', 'Date', 'Function', 'Error', 'JSON'][i++];) {
  (function (type) {
    Type["is" + type] = function (object) {
      return Object.prototype.toString.call(object) === '[object ' + type + ']'
    }
  })(type)
}
console.log(Object.prototype.toString.call([]["filter"]))
