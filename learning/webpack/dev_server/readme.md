- npm run script 里的 各种工作流脚本
  一定要在根目录运行
  1. dev 开发时候运行的脚本
  2. start 启动服务器
  3. build 开发完成后， 一健上线文件
- webpack bundle 打包工具
  1. webpack src/index.js 默认打包路口 打包完成默认在dist/main.js下
  2. webpack-cli 命令行工具 
  3. webpack-dev-server 运行webpack编译的同时，启动8080端口，启动一个web-server


- html template
  1. css
  2. js

- resolve 里extensions 加后缀
  module 里加后缀rules: [
    规则
    js -> babel-loader->preset-env
    css-> style-loader, css-loader, styuls -> stylus-loader,styuls
  ]

- 一切皆可以打包， 打包成可以运行的js
  生产的文件css 和 js 分开
  一个文件 http 请求少， 
  并发多个请求，拆成少数几个文件
  js css 分离 是必须的
  样式的分离
  
  