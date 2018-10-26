const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { resolve } = require('path');

module.exports = function configure(config) {
  const options = {
    frameworks: ['source-map-support', 'mocha'],
    files: ['test/**/*.ts'],
    preprocessors: { ['test/**/*.ts']: ['webpack', 'sourcemap'] },
    webpack: {
      mode: 'development',
      entry: { setup: './test/setup.ts' },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules')
        ]
      },
      devtool: 'inline-source-map',
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
      plugins: [new AureliaPlugin()]
    },
    singleRun: false,
    colors: true,
    logLevel: config.browsers && config.browsers[0] === 'ChromeDebugging' ? config.LOG_DEBUG : config.LOG_INFO, // for troubleshooting mode
    mime: { 'text/x-typescript': ['ts'] },
    webpackMiddleware: { stats: 'errors-only' },
    reporters: ['mocha'],
    browsers: config.browsers || ['ChromeHeadless'],
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
      }
    }
  };

  config.set(options);
};
