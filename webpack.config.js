const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const DIST = path.resolve(__dirname, 'public');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
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
    new NodePolyfillPlugin({
      excludeAliases: ['stream', 'buffer'],
    }),
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
    fallback: {
      stream: require.resolve('stream-browserify'),
      // eslint-disable-next-line node/no-extraneous-require
      buffer: require.resolve('buffer-browserify'),
    },
  },
};
