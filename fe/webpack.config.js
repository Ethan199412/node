const path = require("path");
const { PassThrough } = require("stream");
const webpack = require("webpack");

console.log('[p0] dirname', __dirname)
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  output: {
    path: path.resolve(__dirname, "/dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "/public/"),
    port: 3002,
    publicPath: "http://localhost:3002/dist/",
    hot: true,
    proxy: {
      '/data': 'http://localhost:3001',
      '/read': 'http://localhost:3001',
      '/insert': 'http://localhost:3001',
      '/delete': 'http://localhost:3001',
      '/update': 'http://localhost:3001'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // alias:{
  //   react:path.join(__dirname,"./node_modules/beike-hdic-land-selector/node_modules/react")
  // }
};