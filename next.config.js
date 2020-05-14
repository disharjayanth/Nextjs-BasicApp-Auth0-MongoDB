const webpack = require('webpack')
const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const { parsed: localEnv } = require('dotenv').config()

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.PROD_URL

const cssConfig = { cssModules: true }
const nextConfig = {
    publicRuntimeConfig: {
        base_url: BASE_URL,
        client_id: process.env.CLIENT_ID 
    },
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv))   //more plugins here
        return config
    }
}
//argument is 1st is an array where config are put, in 2nd argument we put plugins config
module.exports = withPlugins([ //make sure to enclose it in an array
    [withCSS, cssConfig] // takes in array 1st element is the module we are using and 2nd element is our own config
], nextConfig)   //takes in an array and config of webpack. Inside array css goes in