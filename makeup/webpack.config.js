const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
process.traceDeprecation = true;

module.exports = {
    entry: {
        main: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: path.resolve(__dirname, '/')
    },
    externals: {
        jquery: 'jQuery'
    },
    mode: devMode ? 'development' : 'production',
    plugins: [
        // Notify when build succeeds
        new WebpackNotifierPlugin({ alwaysNotify: true }),

        // Extract any CSS from any javascript file to process it as LESS/SASS using a loader
        new MiniCssExtractPlugin({filename: "css/[name].css"}),

        // Minify CSS assets
        // new OptimizeCSSAssetsPlugin({}),

        // Use BrowserSync plugin for file changes. I.e. if a CSS/SASS/LESS file changes, the changes will be injected directly in the browser with no page load
        new BrowserSyncPlugin({
            open: 'external',
            host: 'localhost',
            port: 3000,
            //proxy: 'http://localhost:9000/',
            server: { baseDir: ['./'] },
            files: ['./css/index.css', './js/*.js', './*.html'],
        }, 
        {
            // disable reload from the webpack plugin since browser-sync will handle CSS injections and JS reloads
            reload: true
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
    },
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?[\d\w#]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: './dist/font/',
                          useRelativePath: true
                        }
                    }
                ]
            }, 
            {
                // Extract any SCSS content and minimize
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    { 
                        loader: 'css-loader', 
                        options: { 
                            url: false,
                            sourceMap: devMode, 
                            importLoaders: 2 
                        } 
                    },                    
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: devMode}     
                    },                   
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: devMode }
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