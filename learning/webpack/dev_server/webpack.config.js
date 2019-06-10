const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const path = require('path')

module.exports = {
  // 入口
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // [] 变量名字叫啥生产啥
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        // 编译执行
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    // 声明
    extensions: ['.js', '.css', '.less'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  // 使用插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin(
      '[name].css'
    )
  ]
}
