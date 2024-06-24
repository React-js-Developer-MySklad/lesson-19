const { merge } = require("webpack-merge");
const config = require('./webpack.config')

module.exports = merge(config, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,

                // https://webpack.js.org/loaders/style-loader/
                // https://webpack.js.org/loaders/css-loader/
                // https://webpack.js.org/loaders/postcss-loader/
                // порядок имеет значение
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    }
})