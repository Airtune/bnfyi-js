const path = require('path');

module.exports = {
  entry: './index.ts',
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "src", "browser-test.ts")
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/")
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: "web"
};
