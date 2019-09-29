const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = (env, argv) => ({
    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/ui.js',
        main: './src/main.ts',
    },

    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },

    module: {
        rules: [
            // Converts Vue code to JavaScript
            { test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/ },

            // Converts TypeScript code to JavaScript
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

            // Enables including CSS by doing "import './file.css'" in your TypeScript code
            { test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },

            // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
            { test: /\.(png|jpg|gif|webp|svg)$/, loader: [{ loader: 'url-loader' }] },
        ],
    },

    resolve: {
        // Webpack tries these extensions for you if you omit the extension like "import './file'"
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new VueLoaderPlugin()
    ],
});


