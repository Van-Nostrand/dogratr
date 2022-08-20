'use-strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash]-[name].[ext]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
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
            }
          }
        ]
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new StylelintPlugin({
      context: './src/scss'
    })
  ],
  devtool: 'source-map',
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
