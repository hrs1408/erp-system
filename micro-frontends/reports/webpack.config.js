const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: 'http://localhost:3007/',
    uniqueName: 'reports'
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'reports',
      filename: 'remoteEntry.js',
      exposes: {
        './ReportsModule': './src/app/reports/reports.module.ts'
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