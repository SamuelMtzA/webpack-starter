const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

 
module.exports = {
 
    mode: 'production',
    
    output: {
        clean:true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
              test: /\.html$/,
              loader: 'html-loader',
              options: {
                minimize: false,
                // Disables attributes processing
                sources: false,
              },
            },
            {
              test: /\.css$/i,
              exclude: /styles.css$/,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /styles.css/,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            
            },
            {
              test: /\.(png|jpg?g|gif)$/,
              loader: 'file-loader',
            },
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
              presets: ['@babel/preset-env']
              }
            }
          }
        ],
    },
    optimization:{
      minimize: true,
      minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      ],
      
    },

    plugins: [
        new HtmlWebPackPlugin({ //crea la relacion webpack
            title: 'Mi-webpack-app',
            template: './src/index.html', //de cual se va a basar
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[fullhash].css',
          ignoreOrder: false,
        }),
        new CopyPlugin({
          patterns: [
            { from: "src/assets/", to: "assets/" }
          ],
        }),
    ]
    
}