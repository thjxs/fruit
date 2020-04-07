const url = require('url');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  module.exports.url = url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '../dist/index.html'),
  });
} else {
  module.exports.url = 'http://localhost:8080';
}
