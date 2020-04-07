const path = require('path');

// Load in laravel mix
const custom = require('../node_modules/laravel-mix/setup/webpack.config.js')

module.exports = {
    stories: ['../stories/**/*.stories.[tj]s'],
    webpackFinal: config => ({ 
        ...config,
        module: { 
            ...config.module, 
            rules: [
                ...custom.module.rules,
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loaders: ['file-loader'],
                    include: path.resolve(__dirname, '../')
                }
            ]
        }
    })
}