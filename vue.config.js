const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^ws$/),
    ]
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    // @vue/cli-service/lib/config/app.js
    config.optimization.splitChunks({
      chunks: 'all'
    })
  }
}