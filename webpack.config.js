'use strict'

const
  path = require('path')
,
  webpack = require('webpack'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin')
;

module.exports = (env) => {
  const 
    isProd = !!(env && env.production),
    isDev = !isProd
  ;

  return {
    entry: 'index.js',
    output: {
      filename: 'dist.js',
      path: path.join(__dirname, 'public', 'js') 
    },
    devtool: isDev && 'inline-source-maps',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-react']
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
          'process.env.NODE_ENV': JSON.stringify('prod')
        }),
        new UglifyJSPlugin({
          sourceMap: true
        })
      ]
    )
  }
}
