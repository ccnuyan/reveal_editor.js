const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = [{
  test: /\.js$/,
  exclude: path.join(__dirname, '../node_modules'),
  loader: 'babel-loader',
}, {
  test: /\.scss$/,
  // https://webpack.js.org/plugins/extract-text-webpack-plugin/#components/sidebar/sidebar.jsx
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    publicPath: './build/assets/',
    use: [
      {
        loader: 'css-loader',
        options: {
          // CSS Loader https://github.com/webpack/css-loader
          importLoaders: 1,
          sourceMap: true,
          // CSS Modules https://github.com/css-modules/css-modules
          // modules: true,
          // localIdentName: '[name]-[local]-[hash:base64:5]', // no module in this project
          // CSS Nano http://cssnano.co/options/
          minimize: false,
          discardComments: {
            removeAll: true,
          },
        },
      },
      // postcss-loader should before sass-loader
      {
        loader: 'postcss-loader',
        options: {
          config: './webpack/postcss.config.js',
        },
      },
      {
        loader: 'sass-loader', // compiles Sass to CSS
      },
    ],
  }),
}, {
  test: /\.md$/,
  use: [
    {
      loader: 'html-loader',
    },
    {
      loader: 'markdown-loader',
    },
  ],
}, {
  test: /\.woff(2)?(\?[a-z0-9]+)?$/,
  use: {
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
}, {
  test: /\.(ttf|eot)(\?[a-z0-9]+)?$/,
  use: {
    loader: 'file-loader',
  },
}, {
  test: /\.svg$/,
  use: {
    loader: 'svg-inline-loader',
  },
}];
