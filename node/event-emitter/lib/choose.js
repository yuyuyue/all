// 命令行交互方式
// inquirer.prompt知道选择了哪个选项
const inquirer = require('inquirer');

module.exports = (songs) => inquirer.prompt([{
  type: 'list',
  name: 'song',
  message: '共有 ' + songs.length + ' 个结果, 按下回车播放',
  choices: songs.map((song, index) => `${index + 1}${song.name}`)
}])
