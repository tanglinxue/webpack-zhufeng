let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  mode:'production',
  //多入口
  entry:{
    home:'./src/index.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      }
    ]
  },
  //devtool:'source-map',//增加映射文件，可以帮我们调试源代码
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  // watch:true,
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      chunks:['home']
    }),
    new CleanWebpackPlugin('./dist')
  ]
}
