const { createHash } = require('crypto');

/**
 * Echo hash string
 * @param {String} str
 */
function generateHash(str) {
  return createHash('md5').update(str).digest('hex');
}

module.exports = {
  generateHash,
};
