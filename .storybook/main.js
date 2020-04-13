const path = require('path');

// Load in laravel mix
const custom = require('../node_modules/laravel-mix/setup/webpack.config.js')

module.exports = {
    stories: ['../stories/**/*.stories.[tj]s'],
    webpackFinal: config => {
        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...custom.module.rules
                ]
            }
        }
    }
}