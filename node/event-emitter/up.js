const EventEmit = require('events')

class Ev extends EventEmit {}
const ev = new Ev()

// 绑定事件
;['search', 'choose'].forEach(key => {
  // ...arg
  // 1. 把剩余的传入的参数打散为数组
  // 2. 将数组原封不动传递给一个函数
  ev.on(key, async function (...args) {
    const fn = require(`./lib/${key}`)
    const res = await fn(...args)
    ev.emit('handle', key, res, ...args)
  })
})

ev.on('afterSearch', (data, keyword) => {
  console.log(data)
  if (!data || !data.result || !data.result.songs) {
    console.log(`没搜索到 ${keyword} 的相关结果`)
    return;
  }
  const songs = data.result.songs
  // console.log(songs)
  ev.emit('choose', songs)
})
ev.on('handle', (key, res, ...args) => {
  switch (key) {
    case 'search': {
      return ev.emit('afterSearch', res, args[0])
      break
    }
  }
})
function main (argv) {
  // console.log(process)
  // console.log(argv)
  let keyword
  if (!argv || !argv.length) {
    keyword = argv[2]
    console.log(keyword)
  }
  ev.emit('search', keyword)
}

main(process.argv)
