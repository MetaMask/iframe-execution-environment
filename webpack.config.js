const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST = path.resolve(__dirname, 'public');
const prefix = require('./package.json').homepage;

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';
  const htmlwebpackOptions = isProd ? { publicPath: prefix } : undefined;

  let extraOptions = {};

  if (isProd === false) {
    extraOptions = {
      devtool: 'inline-source-map',
    };
  }
  const config = {
    ...extraOptions,
    mode: argv.mode,
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: DIST,
      publicPath: DIST,
    },
    devServer: {
      contentBase: DIST,
      port: 9011,
      writeToDisk: true,
    },
    plugins: [
      new HtmlWebpackPlugin(htmlwebpackOptions),
      new NodePolyfillPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: 'ts-loader',
          exclude: /node_modules/u,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
  return config;
};
