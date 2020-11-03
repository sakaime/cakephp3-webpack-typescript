const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => ({
    entry: "./assets/js/app.ts",

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
    ],

    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    target: ["web", "es5"],
});
