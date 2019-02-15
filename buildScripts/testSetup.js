//This file isn't transpiled, so it must use CommonJS and ES5

//Register babel to transpile before our tests run.
require('babel-register')();

//Disable webpack features that Moca dosen't understand
require.extensions['.css'] = function () {};