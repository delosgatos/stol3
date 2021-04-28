const path = require('path');
const autoprefixer = require('autoprefixer');
//const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: path.resolve(__dirname, '/')
    },
    watch: false,
    externals: {
        jquery: 'jQuery'
    },
    mode: 'development',
    plugins: [
        // Notify when build succeeds
        //new WebpackNotifierPlugin({ alwaysNotify: true }),

        // Extract any CSS from any javascript file to process it as LESS/SASS using a loader
        new MiniCssExtractPlugin({filename: "css/[name].css"}),

        // Minify CSS assets
        // new OptimizeCSSAssetsPlugin({}),

        // Use BrowserSync plugin for file changes. I.e. if a CSS/SASS/LESS file changes, the changes will be injected directly in the browser with no page load
        /* new BrowserSyncPlugin({
            proxy: 'localhost',
            open: 'external',
            host: 'localhost',
            port: 3000,
            files: ['./css/index.css', './js/index.js']
        }, 
            {
                // disable reload from the webpack plugin since browser-sync will handle CSS injections and JS reloads
                reload: false
            })*/
    ],
    module: {
        rules: [
            /* {
                // Transpile ES6 scripts for browser support
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, */         
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'font/'
                        }
                    }
                ]
            }, 
            {
                // Extract any SCSS content and minimize
                test: /\.scss$/,
                use: [                       
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },                    
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }     
                    },                   
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }                  
                ]
            },
            /*{
                // Extract any CSS content and minimize
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { sourceMap: true } }
                ]
            }  */           
        ]
    }
};