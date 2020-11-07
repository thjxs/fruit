const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: 'fruit',
    devtool: 'source-map',
    devServer: {},
    entry: {
      app: ['./app/main.js'],
    },
    output: {
      chunkFilename: '[name].[contenthash:8].js',
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ],
    target: 'electron-renderer',
  },
];
