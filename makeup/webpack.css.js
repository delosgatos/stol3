const path = require('path');
module.exports = {
    mode: 'development',
    entry: ['./css/index.scss'],
    output: {
       path: path.resolve(__dirname, '')
    },
    module: {
      rules: [
        {
          test:/index.scss$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'css/[name].css',
                  compact: false,
                  query: {
                    compact: false
                  }
                }
              },
              {
                loader: 'postcss-loader',
                // postcssOptions?, execute?, sourceMap?, implementation? 
                options: {
                }
              },
              {
                loader: 'extract-loader',
                options: {
                  compact: false,
                  query: {
                    compact: false
                  }
                }
              },
              {
                loader: 'css-loader?-url',
                  // url?, import?, modules?, sourceMap?, importLoaders?, esModule? 
              },
              {
                loader: 'sass-loader',
                options: {
                }
              }
            ]
        },
      ],
    },
    plugins: [
       //new FixStyleOnlyEntriesPlugin(),
       //new OptimizeCSSAssetsPlugin({})
    ]
  };