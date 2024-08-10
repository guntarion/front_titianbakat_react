const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const opn = require("opn");

const publicPath = "/";

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? "production" : "development",
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].bundle.js",
      publicPath: publicPath,
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      onAfterSetupMiddleware() {
        opn(`http://localhost:${this.port}/index`);
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: 'single',
    },
    externals: {
      config: JSON.stringify({
        apiUrl: "",
        publicPath: "/",
      }),
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|png|svg|gif)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "Hot Module Replacement",
        template: "./public/index.html",
        filename: "./index.html",
        favicon: "./public/favicon.png",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css",
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "css/*.*",
          "js/*.*",
          "fonts/*.*",
          "images/*.*",
        ],
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
    ],
  };
};