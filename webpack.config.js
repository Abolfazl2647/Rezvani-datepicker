const webpack = require('webpack');
module.exports = {
    devtool:'source-map',
    entry:'./src/index.js',
    output: {
        path: __dirname + '/dist/',
        filename:'rezvani-datepicker.js',
    },
    module: {
        loaders:[{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: "babel-loader"
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}
