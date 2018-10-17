const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

module.exports = (env, argv = {}) => {
  const mode = argv.mode || 'production';
  return {
    mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [srcPath],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.js$/,
          include: [srcPath],
          enforce: 'pre',
          loader: 'eslint-loader',
        },
      ],
    },
    output: {
      filename: 'jetstart.js',
      // https://github.com/webpack/webpack/issues/6525
      globalObject: 'typeof self !== "undefined" ? self : this',
      library: 'jetstart',
      libraryTarget: 'umd',
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
  };
};
