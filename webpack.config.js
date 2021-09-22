const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
 
module.exports = {
 
    mode: 'development',
    
    output: {
        clean:true
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
          ],
    },
    optimization:{},

    plugins: [
        new HtmlWebPackPlugin({ //crea la relacion webpack
            title: 'Mi-webpack-app',
            template: './src/index.html', //de cual se va a basar
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          ignoreOrder: false,
        }),
        new CopyPlugin({
          patterns: [
            { from: "src/assets/", to: "assets/" }
          ],
        }),
    ]
    
}