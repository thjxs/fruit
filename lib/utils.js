const crypto = require('crypto');

/**
 * Echo hash string
 * @param {String} str
 */
function generateHash(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

module.exports = {
  generateHash,
};
