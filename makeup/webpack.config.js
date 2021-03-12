module.exports = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
      ],
        
    },
  };