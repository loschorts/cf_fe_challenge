module.exports = {
  context: __dirname,
  entry: "./src/styles.css",
  output: {
      path: __dirname,
      filename: "./dist/styles.css"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }
    ]
  }
}