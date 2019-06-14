const fs = require('fs')
const files = []
function walk(path) {
  fs.readdirSync(path).forEach(file => {
    const newPath = path + '/' + file
    const state = fs.statSync(newPath)
    if (state.isFile()){
      console.log(file)
    } else if (state.idDirectory()) {
      walk(newPath)
    }

    console.log('s', file)
  })


  fs.readdir(path, function(error, files) {
    if (error) {
      console.log(error)
      return ;
    }
    console.log(files)
  })
}
walk('./src')
console.log(files)