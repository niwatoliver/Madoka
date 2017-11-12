const webpack = require('webpack');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  entry: './app/scripts/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/app/build'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015","react"]
      }
    }],
  },
  externals: [
    'electron',
    'fs',
    'googleapis'
  ],
  /* プラグインの設定 */
  plugins: [
    /* DefinePluginの実行 */
    new webpack.DefinePlugin({
      // process.env.NODE_ENVを'production'に置き換える
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.YOUTUBE_API_KRY': JSON.stringify(process.env.YOUTUBE_API_KRY)
    }),
    /* UglifyJsPluginの実行 */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // 圧縮する時に警告を除去する
        warnings: false
      }
    })
  ]
};