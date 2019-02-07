// 1 . define path source folder
// 2. Define path to output

const path = require('path');

module.exports = {
  entry:{
    app: ['@babel/polyfill','./src/app.js'] // entry point to the app
  },
  output: {
    // __dirname = current directory
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  // this is where we define our loaders
  module : {
    rules: [{
      // A regex that looks at all Javascript files
      test: /\.js?$/,
      exclude : /node_modules/,
      loader: 'babel-loader',
      //this is where we define our presets
      query: {
        presets:['@babel/preset-env']
      }
    }]
  }
}