import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname , '/src/vendor'),
    main: path.resolve(__dirname, 'src/index')
},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Minify JS
    new webpack.optimize.UglifyJsPlugin(),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Create HTML file that includes reference to bundle JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject:true,
      //Properties you define here are avilable in index.html
      //using htmlWebpackPlugin.options.varName
      trackJSToken:"4f17f81232f345f99e3b6ca484b0e1fe",
      
      minify:{
        removeComments:true,
        collapseWhitespace:true,
        useShortDoctype:true,
        removeEmptyAttributes:true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash:true,
        minifyJS:true,
        minifyCSS:true,
        minifyURLs:true
      }
    }),

    //Use CommonChunkPlugin to create a seperate bundle
    //of vendor so that they're cached seperatly.
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),

    //Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    //Generate an external css filr with a hash in the filename 
    new ExtractTextPlugin('[name].[contenthash].css')

  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
} 