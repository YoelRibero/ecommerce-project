const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    app: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "./dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.jpg|jpeg|png|gif|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 90000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "templates/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "houses.html",
      template: path.join(__dirname, "templates/houses.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "cars.html",
      template: path.join(__dirname, "templates/cars.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "technologies.html",
      template: path.join(__dirname, "templates/technologies.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "checkout.html",
      template: path.join(__dirname, "templates/checkout.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "order-confirmation.html",
      template: path.join(__dirname, "templates/order-confirmation.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "thankyou.html",
      template: path.join(__dirname, "templates/thankyou.html"),
    }),
  ],
};