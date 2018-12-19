const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ConfigWebpackPlugin = require("config-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    // Special compilation rules
    rules: [
      // babel
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      // babel
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
      },
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /(node_modules|bower_components)/,
      },
      // images
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                bypassOnDebug: true,
                },
            },
            ],
        },
      // easyrtc
      {
        test: require.resolve('./static/easyrtc/easyrtc.js'),
        use: [{
          loader: 'expose-loader',
          options: 'easyrtc'
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ConfigWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'smallapp',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './src/index.html'
    }),
    ]
};