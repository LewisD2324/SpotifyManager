const path = require("path");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
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
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
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
      "/api/**": "http://localhost:8888",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          {
            loader: "style-loader",
            // TODO: Loading CSS in separate files breaks the specificity when using direct material-ui classes as selectors
            // loader: isDevelopment
            //     ? 'style-loader' /* inject CSS into the DOM as a style block */
            //     : MiniCssExtractPlugin.loader /* extract CSS to separate files in prod (needs entry in the plugins section) */,
          },
          {
            // convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to identifiers, except if wrapped in a :global(...) pseudo class)
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[name]__[local]--[hash:base64:5]" },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                // postcssCustomProperties() /* allow css vars */,
                // postcssCustomMedia(/* pluginOptions */),
                // postcssNested(),
                postcssImport(), // allow @import foo.css
                autoprefixer(), // browser prefixes
                // cssnano(), // minification
                // postcssPlugin(),
                // postcssEasings(), // named easing functions from https://easings.net
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: "style-loader",
            // loader: isDevelopment
            //     ? 'style-loader' /* inject CSS into the DOM as a style block */
            //     : MiniCssExtractPlugin.loader /* extract CSS to separate files in prod (needs entry in the plugins section) */,
          },
          {
            // convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to identifiers, except if wrapped in a :global(...) pseudo class)
            loader: "css-loader",
          },
        ],
      },
      { test: /\.tsx?$/, loader: "babel-loader" },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
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
