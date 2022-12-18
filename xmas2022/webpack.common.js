const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'scripts/main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  'node_modules/sass-mq',
                ],
              },
              implementation: require.resolve('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "styles/main.css",
  })],
};
