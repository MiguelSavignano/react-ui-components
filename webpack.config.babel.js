
import webpack from 'webpack'
import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const nodeEnv = {
  value: process.env.NODE_ENV || 'development',
  development: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production',
}

const config = {

  devtool: 'cheap-module-inline-source-map',

  entry: [
    'babel-polyfill',
    resolve('./application_entry.jsx'),
  ],

  output: {
    filename: 'application_bundle.js',
    path: resolve('./'),
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          }, {
            loader: 'sass-loader',
          }],
        }),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(nodeEnv.value) } }),
    new ExtractTextPlugin('./application_bundle.css'),
  ],

}

/* eslint-disable global-require */
if (nodeEnv.development) {
  module.exports = {
    ...config,
    plugins: [
      ...config.plugins,
    ],
  }
} else if (nodeEnv.production) {
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
  module.exports = {
    ...config,
    plugins: [
      ...config.plugins,
      new UglifyJSPlugin(),
    ],
  }
}
