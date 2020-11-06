const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

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
                            postcssOptions: {
                                sourceMap: argv.mode === "development",
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
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    target: ["web", "es5"],
});
