#### 优化方向
- 减少请求次数
- 减少单次请求所花费的时间

#### webpcak打包优化

问题 
1. 构建过程太花时间
2. 结果体积太大

解决方案
- loder优化
1. include 或 exclude 来帮我们避免不必要的转译
2. 开启缓存将转译结果缓存至文件系统,提高转义速度,loader: 'babel-loader?cacheDirectory=true'
- 分开打包第三方库 DllPlugin,只有第三方数据修改才会重新打包
- Happypack——将 loader 由单进程转为多进程
- 删除多于代码 Tree-Shaking
- 按需加载


#### Gzip http 压缩 多用于html，js，css等文件
在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。