const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    port: 3000
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
  ]
};

const appConfig = Object.assign({}, config, {
  name: "app",
  entry: "./src/index.js",
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {name: 'assets/[hash].[ext]'},
        }],
      }
    ],
  }
});

module.exports = [appConfig];
