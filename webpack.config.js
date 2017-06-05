var path = require('path');
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server.ts',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  target: 'node',
  externals: [nodeExternals()]
};
