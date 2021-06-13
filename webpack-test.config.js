const path = require('path');
const webpackDefault = require('./webpack.config');

module.exports = {
  entry: './browser-test.ts',
  context: webpackDefault.context,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          path.resolve(__dirname, "node_modules")
        ]
      }
    ]
  },
  resolve: webpackDefault.resolve,
  output: {
    filename: 'browser-test.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  target: "web",
  optimization: {
    minimize: false
  }
};
