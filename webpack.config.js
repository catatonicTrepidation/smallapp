const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
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
    ]
  }
};