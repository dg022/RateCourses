// swearjar-node
const path = require('path');
const swearjar = require('./swearjar-browser');

swearjar.loadBadWords = function loadBadWords(relativePath) {
  const basePath = path.dirname(module.parent.filename);
  const fullPath = path.join(basePath, relativePath);
  this._badWords = require(fullPath);
};


module.exports = swearjar;
