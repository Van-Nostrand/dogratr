'use-strict'
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: isProd ? 'production' : 'development',
  context: __dirname,
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
    clean: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|svg|png|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new StylelintPlugin({
      context: './src/scss/'
    })
  ]
}

if (!isProd) {
  config.devServer = {
    port: 8080,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true
  }
}

module.exports = config
