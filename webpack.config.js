const webpack = require('webpack');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

const defineEnv = new webpack.DefinePlugin({
  'process.env': { 'YOUTUBE_API_KRY': JSON.stringify(process.env.YOUTUBE_API_KRY) }
});

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
  plugins: [defineEnv]
};