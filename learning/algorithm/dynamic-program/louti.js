// function lou(n) {

//   if (n < 0) {
//     return 0
//   }
//   if (n === 1) {
//     return 1
//   }
//   if (n === 2) {
//     return 2
//   }
//   return lou(n - 1) + lou(n - 2)
// }
// console.log(lou(12))
function lou1(n){
  var a = 1
  var b = 2
  var tmp
  for (let i = 3; i < n + 1; i++){
    tmp = a + b
    a = b
    b = tmp
  }
  return tmp
}
console.log(lou1(12))