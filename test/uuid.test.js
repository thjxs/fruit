const { generateHash } = require('../lib/utils');
const assert = require('assert');

describe('create hash', () => {
  it('length', () => {
    assert.deepStrictEqual(generateHash('str').length, 32);
  });
});
