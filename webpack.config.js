const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const shared = { react: { singleton: true }, "react-dom": { singleton: true } };

const app = (name, port, federation) => ({
  name,
  entry: `./src/${name}/index.ts`,
  output: { publicPath: "auto", path: path.resolve(__dirname, "dist", name) },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: { rules: [{ test: /\.tsx?$/, loader: "esbuild-loader", options: { loader: "tsx" } }] },
  devServer: { port, headers: { "Access-Control-Allow-Origin": "*" } },
  plugins: [
    new ModuleFederationPlugin({ name, shared, ...federation }),
    new HtmlWebpackPlugin({ templateContent: '<div id="root"></div>' }),
  ],
});

module.exports = [
  app("host", 3000, {
    remotes: {
      header: "header@http://localhost:3001/remoteEntry.js",
      content: "content@http://localhost:3002/remoteEntry.js",
    },
  }),
  app("header", 3001, { filename: "remoteEntry.js", exposes: { "./Header": "./src/header/Header" } }),
  app("content", 3002, { filename: "remoteEntry.js", exposes: { "./Content": "./src/content/Content" } }),
];
