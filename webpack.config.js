const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

const frontendConfig = {
    entry: path.resolve(__dirname, 'src', 'frontend', 'index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'deploy', 'frontend'),
        publicPath: '/'
    },
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/availability': "http://localhost:8080",
            '/distance': "http://localhost:8080",
            '/intent': "http://localhost:8080",
            '/order': "http://localhost:8080",
            '/confirm_payment': "http://localhost:8080",
            '/mapAc': "http://localhost:8080",
            '/inRange': "http://localhost:8080",
            
        }
    },
    module: {
        rules: [
            {

                test: /\.js?/,
                exclude: /nodue_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {"targets": {"node": "10"}}], '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|mp4|svg)$/i,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Template',
        template: './src/frontend/index.html'
    })]
}

const backendConfig = {
    entry: path.resolve(__dirname, 'src', 'server', 'server.js'), 
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'deploy', 'server')
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {

                test: /\.js?/,
                exclude: /nodue_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {"targets": {"node": "10"}}], '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|mp4)$/i,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    }
}

module.exports = frontendConfig