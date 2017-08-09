const config = {
  entry: {
    app: ['babel-polyfill', './js/editor.js'],
    vendor: ['whatwg-fetch', 'react', 'react-dom'], // whatwg-fetch is imported in './includes.js'
  },
  target: 'web',
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './build/assets/'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
    }),
    new UglifyJSPlugin({
      // beautify: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
    }),
  ],
  module: {
    rules,
  },
  externals: {
    // when setting react as a external lib, webpack won't build react into the bundle.
    // but as InjectTapEventPlugin require some react sub files, webpack don't know these files are external.
    // As a result it build these files into the bundle.
    // so when InjectTapEventPlugin run and register tap event to react.
    // It register into a standalone react env and tap event can't fire
    // so always pack react with your app together, unless their is a solution of this issue.
  },
};

module.exports = config;