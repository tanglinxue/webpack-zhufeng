let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyjsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  devServer:{//开发服务器的配置
    port:3000,
    progress:true,
    contentBase:'./build',
    compress:true
  },
  optimization:{//优化项
    // minimizer:[
    //   new UglifyjsPlugin({
    //     cache:true,
    //     parallel:true,
    //     sourceMap:true
    //   }),
    //   new OptimizeCss()
    // ]
  },
  mode:'development', //模式 默认两种 production development
  entry:'./src/index.js', //入口
  output:{
    filename:'bundle.[hash:8].js',//打包后的文件名
    path:path.resolve(__dirname,'build') //路径必须是一个绝对路径
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      minify:{
        // removeAttributeQuotes:true,
        // collapseWhitespace:true,  
      },
      hash:true
    }),
    new MiniCssExtractPlugin({
      filename:'css/main.css'
    }),
    new webpack.ProvidePlugin({
      $:'jquery'
    })
  ],
  module:{
   rules:[ 
    // {
    //   test:/\.js$/,
    //   use:{
    //     loader:'eslint-loader',
    //     options:{
    //       enforce:'pre'
    //     }
    //   }
    // },
    // {
    //   test:require.resolve('jquery'),
    //   use:'expose-loader?$'
    // },
    {
      test:/\.html$/,
      use:'html-withimg-loader'
    },
    {
     test:/\.(png|jpg|gif)$/,
     use:{
      loader:'url-loader',
      options:{
        limit:1,
        esModule:false,
        outputPath:'img/',
        publicPath:'https://www.zhufengpeixun.cn/'
      }
     }
    },
    {
      test:/\.js$/,
      use:{
        loader:'babel-loader',
        options:{ //用babel-loader 需要把es6=>es5
          presets:[
            '@babel/preset-env'
          ],
          plugins:[
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime'
          ]
        }
      },
      include:path.resolve(__dirname,'src'),
      exclude:/node_modules/
    },
    { //css-loader 解析@import 这种语法的
      //style-loader 他是把css插入到head的标签中
      //loader的特点 希望单一,顺序默认从右向左
      test:/\.css$/,
      use:[
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    },
    {
      test:/\.less$/,
      use:[
        // 'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader' //less=>css
      ]
    }
   ]
  }
}
