import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import path from 'path';

const env = process.env.NODE_ENV;
const PATH = {
  INPUT: './assets/js/common.js',
  OUTPUT:'./template/js/main.js'
}


export default {
  entry: PATH.INPUT,
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname,
    filename: PATH.OUTPUT
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
  postcss: () => {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: [] })]
    };
  }
};
