var path = require('path');
var UglifyJS = require('uglify-es');
var webpack = require('webpack');

var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');


var pathOutput = path.resolve(__dirname, '..');


module.exports = {

  context: __dirname,

  mode: process.env.NODE_ENV,

  entry: './x4-media-library.js',

  output: {
    filename: 'x4-media-library.min.js',
    path: pathOutput,
  },

  externals: {
    jquery: 'jQuery',
    localStorage: 'localStorage',
    X4MediaLibrary: 'X4MediaLibrary',
    wp: 'wp',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': __dirname,
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        exclude: /node_modules/,
      }),
    ],
  },

  performance: {
    hints: false,
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        minify(file, sourceMap) {
          return UglifyJS.minify(file, {
            compress: {
              hoist_props: false,
            },
            output: {
              comments: false,
            },
          });
        },
      }),
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'x4-media-library.min.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        exclude: /node_modules/,
        oneOf: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            ],
          },
          {
            test: /\.pug$/,
            use: [
              {
                loader: 'pug-plain-loader',
                options: {
                  basedir: __dirname,
                },
              },
            ],
          },
          {
            test: /\.sass$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  indentedSyntax: true,
                  outputStyle: 'compressed',
                  data: '@import "~/components/styles/globals.sass";',
                },
              },
            ],
          },
        ],
      },
    ],
  },

};
