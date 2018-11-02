const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
  entry: {
    common: ['babel-polyfill', 'raf', 'react', 'react-dom', 'redux', 'react-redux'],
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      use: {
        loader: 'babel-loader',
      },
    }, { // components 文件夹下使用 css module
      test: /\.(css|less)$/,
      include: [
        path.resolve(__dirname, 'src', 'components'),
      ],
      use: [
        'style-loader',
        {
          loader: "css-loader",
          options: {
            modules: true,
            minimize: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    }, {
      test: /\.(css|less)$/, // 非 components 文件夹下禁用 css module
      exclude: [
        path.resolve(__dirname, 'src', 'components'),
      ],
      use: [
        'style-loader',
        {
          loader: "css-loader",
          options: {
            minimize: true,
          },
        }, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          minimize: true, // 是否压缩 html
        },
      }],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[hash].[ext]',
        },
      }],
    }, {
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      use: 'file-loader',
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
        },
      }],
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common'],
      minChunks: Infinity,
    }),
    new CleanWebpackPlugin(['./dist/']),
  ],
  resolve: {
    modules: ['node_modules', 'src'], // 用于查找模块的目录
    extensions: ['.js', '.jsx', '.json', '.less', '.css'], // 使用的扩展名
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      common: path.resolve(__dirname, 'src/common/'),
      store: path.resolve(__dirname, 'src/store/'),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    overlay: true,
    compress: true,
    port: 2333,
    open: true,
  },
  devtool: 'source-map',
  target: 'web',
}

// for build
if (env === 'production') {
  config.plugins = config.plugins.concat([
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
        ecma: 5,
        keep_classnames: true,
        keep_fnames: true,
        output: {
          comments: false,
          beautify: false,
        },
      },
    }),
  ])
}

module.exports = config;
