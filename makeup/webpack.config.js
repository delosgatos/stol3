const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['./src/index.js','./src/tailwind.css','./css/index.scss'],
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '')
  },
  module: {
    rules: [
      {
        test:/tailwind.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].css',
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
      },
      {
        test:/index.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].css',
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
      },
    ],
  },
  plugins: [
      new MiniCssExtractPlugin({filename: "css/[name]css"}),
      //new FixStyleOnlyEntriesPlugin(),
      //new OptimizeCSSAssetsPlugin({})
  ]

};