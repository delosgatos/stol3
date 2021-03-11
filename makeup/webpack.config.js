module.exports = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/i,
          use: [
            "style-loader",
            "css-loader"
          ],
        },
      ],
    },
  };