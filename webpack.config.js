const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    assetModuleFilename: 'images/[name][ext][query]'
  },
  devtool: "source-map",
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: "./src/index.html"
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      type: 'asset/resource'
    }]
  }
}
