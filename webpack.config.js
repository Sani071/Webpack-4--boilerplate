const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  //pointed the entry file
  entry: "./src/scripts/index.js",
//pointed the output file
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
//mode:"production" //for production version
  mode: "development",//for development

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    open: true
  },

  module: {
    //all loders
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        //in option area  you can use  babel plugins as your needed
        option:{
          presets:["@babel/preset-env"],
          plugins:
          [
            "@babel/plugin-transform-destructuring"//you can also add more plugings if needed with comma separated
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false,//youn can true this if you want minimize 
            removeComments: false,
            collapseWhitespace: false
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/"
            }
          }
        ]
      }
    ]
  },
//all plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new CleanWebpackPlugin('dist')
  ]
};

//helped from HM Nayeem (Boss)
