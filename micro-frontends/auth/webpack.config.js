const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    publicPath: 'http://localhost:3001/',
    uniqueName: 'auth'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthModule': './src/app/auth/auth.module.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        '@angular/material': { singleton: true, strictVersion: true },
        '@ngrx/store': { singleton: true, strictVersion: true },
        '@ngrx/effects': { singleton: true, strictVersion: true },
        'rxjs': { singleton: true, strictVersion: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    port: 3001,
    hot: true,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}; 