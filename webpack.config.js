const path = require('node:path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
// const imageWebpackLoader = require('image-webpack-loader');

module.exports = {
  mode: 'production',
 // mode: 'development',		  
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },

  optimization: {
   minimize: true,
    minimizer: [new CssMinimizerPlugin(),new TerserPlugin()],
  },

  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
              }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader",],
        },
    ]
  },      

  plugins: [
      new MiniCssExtractPlugin({
         filename: './src/style/css/index.css'         
      }),
      new HtmlWebpackPlugin({
        minify: true,
        template: './index.html'
      }),
      new CleanWebpackPlugin(),
  ],  
};