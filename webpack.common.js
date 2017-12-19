const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Two entry points here means that Webpack will start a bundle for the individual dependencies of both index.js and main.scss
  //entry: ['./src/index.js', './src/scss/main.scss'],
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    // Put files in a 'distribution' folder
    publicPath: 'dist',
    // Output file name. Feel free to change this
    // [hash] adds a cache busting string to the file
    filename: 'bundle.js',
  },
  resolve: {extensions: ['.js','.jsx']},
  module: {
    rules: [
      // {
      //   // Transpile the JS from ES6/7 down to machine optimised ES5
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      // {
      //   // Lint the JS with errors and warnings to the terminal
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     emitWarning: true,
      //     cache: true,
      //     fix: true,
      //   },
      // },
      // {
      //   test: /\.jsx$/, // all files ending with .jsx
      //   loader: ['babel-loader', 'eslint-loader'], // use the babel-loader and eslint loader for all .jsx files
      //   exclude: /node_modules/ // exclude searching for files in the node_modules directory
      // },
      {
        test: /\.(js|jsx)$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loaders: ['babel-loader', 'eslint-loader'] // use babel-loader and eslint loader
        //loaders: ['babel-loader'] // use babel-loader and eslint loader
      },
      {
        // Move font files used the in the SASS into Dist
        test: /\.(ttf|eot|woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      },
      {
        // Move image files used the in the code into Dist
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
          {
            // Minify SVG only with image-webpack-loader
            loader: 'image-webpack-loader',
            options: {
              // jpeg, png, gif enabled: false will disable optipng
              mozjpeg: {
                enabled: false,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                enabled: false,
              },
              gifsicle: {
                enabled: false,
              },
            }
          },
        ],
      },
    ],
  },
  // Pull the CSS out to it's own file (main.css)
  // [hash] adds a cache busting string to the file
  plugins: [new ExtractTextPlugin('main.css')],
};
