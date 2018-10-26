const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = function configure() {
  return {
    mode: 'development',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        resolve(__dirname, 'src'),
        resolve(__dirname, 'node_modules')
      ]
    },
    entry: { app: ['aurelia-bootstrapper'] },
    output: {
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
      sourceMapFilename: '[name].[hash].map.js',
      chunkFilename: '[name].[hash].chunk.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: resolve(__dirname, 'dist'),
      historyApiFallback: true,
      lazy: false,
      open: true,
      overlay: { warnings: true, errors: true }
    },
    module: {
      rules: [{
        test: /\.html$/i,
        loader: 'html-loader'
      }, {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new AureliaPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        metadata: { dev: true }
      })
    ]
  };
};
