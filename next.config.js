const path = require('path')
const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = withCss(withSass({
    webpack(config) {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            containers: path.resolve(__dirname, './src/containers'),
            components: path.resolve(__dirname, './src/components'),
            reducers: path.resolve(__dirname, './src/redux'),
            routes: path.resolve(__dirname, './routes'),
            api: path.resolve(__dirname, './src/api'),
            actions: path.resolve(__dirname, './src/redux/actions')
        }

        config.plugins.push(
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        );
        config.plugins.push(new LodashModuleReplacementPlugin())
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

        return config
    }
}))
