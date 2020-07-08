const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: "source-map",
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    // headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    contentBase: "dist",
    compress: true,
    port,
    proxy: {
      "/login": "http://localhost:8888",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.tsx?$/, loader: "babel-loader" },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/node_modules/, require.resolve("./public/index.html")],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
};
