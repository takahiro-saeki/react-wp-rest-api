var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var env = process.env.NODE_ENV;
var OUTPUT_PATH = './template/js/main.js';
var INPUT_PATH = './assets/js/common.js';
var path = require('path')

module.exports = {
  entry: INPUT_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname,
    filename: OUTPUT_PATH
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /(\.jpg|\.png)$/, loader: "url-loader?limit=1"
      },
      {
        test: /(\.jpg|\.png)$/, loader: "file?name=template/img/[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: [] })]
    };
  }
};
