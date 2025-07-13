const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: 'http://localhost:3004/',
    uniqueName: 'sales'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sales',
      filename: 'remoteEntry.js',
      exposes: {
        './SalesModule': './src/app/sales/sales.module.ts'
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
    })
  ]
}; 