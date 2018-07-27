module.exports = function (cooking) {
  cooking.add('preLoader.js', {
    test: /\.jsx?$/,
    exclude: /node_modules|bower_components/,
    loader: 'eslint-loader'
  })

  cooking.add('preLoader.vue', {
    test: /\.vue$/,
    exclude: /node_modules|bower_components/,
    loader: 'eslint-loader'
  })

  cooking.config.eslint = {
    formatter: require('eslint-friendly-formatter'),
    // eslint error 会打断 webpack build 过程
    emitWarning: true
  }
}
