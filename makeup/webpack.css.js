const path = require('path');
module.exports = {
    mode: 'development',
    entry: ['./src/tailwind.css'],
    output: {
       path: path.resolve(__dirname, '')
    },
    module: {
      rules: [
        {
          test:/tailwind.css$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'css/[name].css',
                }
              },
              {
                loader: 'postcss-loader'
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