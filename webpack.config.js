const webpack = require('webpack');
const path = require('path');

const inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    home: './src/RootComponents/index.js',
    story: './src/RootComponents/StoryApp.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [],
};

if (inProduction) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
  module.exports.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));
}
