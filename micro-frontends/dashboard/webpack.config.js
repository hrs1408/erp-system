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
        use: [
          {
            loader: '@angular-devkit/build-angular/src/babel/webpack-loader',
            options: {
              aot: false,
              buildOptimizer: false
            }
          },
          '@angular-devkit/build-angular/src/babel/webpack-loader'
        ]
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
    publicPath: 'http://localhost:3002/',
    uniqueName: 'dashboard'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardModule': './src/app/dashboard/dashboard.module.ts'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
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
    port: 3002,
    hot: true,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}; 