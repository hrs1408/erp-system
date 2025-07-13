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
    publicPath: 'http://localhost:3000/',
    uniqueName: 'erp-host'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {}
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'erp-host',
      remotes: {
        'auth': 'auth@http://localhost:3001/remoteEntry.js',
        'dashboard': 'dashboard@http://localhost:3002/remoteEntry.js',
        'inventory': 'inventory@http://localhost:3003/remoteEntry.js',
        'sales': 'sales@http://localhost:3004/remoteEntry.js',
        'hr': 'hr@http://localhost:3005/remoteEntry.js',
        'finance': 'finance@http://localhost:3006/remoteEntry.js',
        'reports': 'reports@http://localhost:3007/remoteEntry.js'
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
    port: 3000,
    hot: true,
    liveReload: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true
  }
}; 