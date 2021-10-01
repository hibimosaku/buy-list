const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const webpack_config = {
  target: 'web',

  entry: {
    'assets/js/app': `${__dirname}/src/index.ts`,
  },

  output: {
    path: __dirname,
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.vue', '.js', '.ts'],
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 c”¨
    // },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      // {
      //   test: /\.html$/,
      //   use: 'html-loader',
      // },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      // },
      // {
      //   test: /\.(gif|png|jpe?g|)$/,
      //   use: 'url-loader',
      // },
    ],
  },

  optimization: {
    splitChunks: {
      name: 'assets/js/vendor',
      chunks: 'initial',
    },
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'assets/css/index.css',
    // }),
    new VueLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //   NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    //   }
    // }),
  ],
};

module.exports = webpack_config;
