const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => ({
    entry: "./assets/ts/app.ts",

    output: {
        path: path.resolve(__dirname, "webroot"),
        filename: "js/app.js",
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "assets/scss"),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: argv.mode === "development",
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: argv.mode === "development",
                            postcssOptions: {
                                plugins: [
                                    require("autoprefixer")({ grid: true }),
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: argv.mode === "development",
                        },
                    },
                    "import-glob-loader",
                ],
            },
        ],
    },

    devtool: "source-map",

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/app.css",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],

    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin(),
        ],
    },

    performance: {
        maxEntrypointSize: 500000,
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    target: ["web", "es5"],
});
