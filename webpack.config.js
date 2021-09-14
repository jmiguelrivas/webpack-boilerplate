const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pug = {
  test: /\.(pug|jade)$/,
  exclude: ["/node_modules/"],
  use: [
    "html-loader",
    {
      loader: "pug-html-loader",
      options: {}
    }
  ]
};

// const html = {
//   test: /\.html?$/,
//   use: [
//     {
//       loader: "html-loader",
//       options: { minimize: true }
//     }
//   ]
// };

const js = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};

const typescript = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const eslint = {
  test: /\.tsx?$/,
  enforce: 'pre',
  use: [
    {
      options: {
        eslintPath: require.resolve('eslint'),

      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  exclude: /node_modules/,
};

const sass = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "sass-loader",
  ],
};

const imgs = {
  test: /\.(png|jpe?g)$/,
  type: "asset/resource",
};

module.exports = {
  mode: "development",
  module: {
    rules: [
      js,
      pug,
      // html,
      sass,
      imgs,
      typescript,
      eslint,
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.pug'),
      inject: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    compress: true,
    port: 9000,
  },
}