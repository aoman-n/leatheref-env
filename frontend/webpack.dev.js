const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    historyApiFallback: true,
    port: 4000,
    inline: true,          // http:localhost:8080/webpack-dev-server/ではなくhtttp:localhost:8080/でアクセスできるようになる。
    host:"0.0.0.0"         // ※ dockerのコンテナで立てたサーバが他のホストからアクセスできるように全てのネットワークインターフェースに接続
  },
});
