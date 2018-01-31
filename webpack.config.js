'use strict'

const
  path = require('path')
,
  UglifyJSPlugin = require('uglifyjs-webpack-plugin')
;

module.exports = (env) => {
  const 
    isProd = !!env.production,
    isDev = !env.production
  ;

  return {
    entry: path.resolve('src', 'index.js'),
    output: {
      filename: 'dist.js',
      path: path.join(__dirname, 'public', 'js') 
    },
    devtool: isDev && 'inline-source-maps',
    module: {
      rules: [
        {
          test: /\.jsx/$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      
    ].concat(isDev ?
      [

      ]
      :
      [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJSPlugin({
          sourceMap: true
        })
      ]
  }
}
