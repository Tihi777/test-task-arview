const { resolve } = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const DEV = 'development';

const NODE_ENV = process.env.NODE_ENV || DEV;
const BUILD_TYPE =
  (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase()) || DEV.toUpperCase();

const isDevelopment = NODE_ENV === DEV;

const target = isDevelopment ? 'web' : 'browserslist';

module.exports = {
  mode: NODE_ENV,
  target: target,
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    assetModuleFilename: 'images/[chunkhash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(pdf|txt|doc|docx|xls|xlsx|zip)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][ext]',
              outputPath: 'files/',
            },
          },
        ],
      },
      {
        test: /manifest\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      BUILD_TYPE: JSON.stringify(BUILD_TYPE),
    }),
    isDevelopment && new HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment &&
      new ESLintPlugin({
        failOnError: false,
        failOnWarning: false,
        quiet: true,
      }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8080,
    hot: true,
    clientLogLevel: 'silent',
  },
  devtool: isDevelopment ? 'source-map' : false,
  stats: 'errors-warnings',
};
