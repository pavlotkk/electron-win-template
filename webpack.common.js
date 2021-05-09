const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const electronMainConfig = {
    target: "electron-main",
    entry: "./src/main/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, ".webpack")
    },
}

const electronPrelaodConfig = {
    target: "electron-main",
    entry: "./src/main/preload.js",
    output: {
        filename: "preload.js",
        path: path.resolve(__dirname, ".webpack")
    },
}

const electronRendererConfig = {
    target: "electron-renderer",
    entry: "./src/renderer/index.js",
    output: {
        filename: "renderer.js",
        path: path.resolve(__dirname, ".webpack")
    },
    module: {
        rules: [
            {
              test: /\.scss$/i,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.html$/i,
              loader: 'html-loader',
                options: {
                  sources: {
                    list: [
                      {
                        tag: 'img',
                        attribute: 'data-webpack-src',
                        type: 'src',
                      },
                      {
                        tag: 'link',
                        attribute: 'data-webpack-src',
                        type: 'src',
                      },
                    ]
                  }
                }
            },
            {
              test: /\.(png|jpe?g|gif|ico)$/i,
              loader: 'file-loader',
              options: {
                outputPath: "assets",
                name: '[name].[ext]',
              },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/renderer/index.html"
        })
    ],
}

module.exports = {
    electronMainConfig,
    electronPrelaodConfig,
    electronRendererConfig,
}
