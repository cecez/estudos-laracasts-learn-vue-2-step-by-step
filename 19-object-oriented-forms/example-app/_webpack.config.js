let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        app: './resources/js/app.js',
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\/]node_modules[\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },

    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js',
        publicPath: './public'
    },

    plugins: [],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.optimization.minimize = true;

}
