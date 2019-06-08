const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  entry: {
    main: path.resolve(__dirname, 'index.js')
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'src/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(css|scss|less)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@scss': path.resolve(__dirname, 'assets/style'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@common': path.resolve(__dirname, 'src/common')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7000,
    inline: true,
    hot: true,
    compress: true,
    overlay: true,
    stats: "error-only",
    open: true,
    disableHostCheck: true
  },
  plugin: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: "index.html",
      // favicon: path.resolve(__dirname, 'assets/image/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}