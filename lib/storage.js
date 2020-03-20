const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

class Storage {
  constructor(path) {
    this._path = path;
    this._files = this.loadFiles();
    this._collections = this.loadCollections();
    this._hash = crypto.createHash('md5', {
      outputLength: 16
    });
  }
  loadFiles() {
    return new Set(fs.readdirSync(this._path));
  }
  loadCollections() {
    return JSON.parse(fs.readFileSync(this._path + '/collections.json'));
  }
  getFileByHash(hash) {
    return this._files.has(hash);
  }
  setFile(data) {
    this._files.add(data.hash);
  }
  hash(url) {
    const hash = crypto.createHash('md5', {
      outputLength: 16
    });
    hash.update(url);
    return hash.digest('hex');
  }
  async cacheFile(current) {
    let fruitData = this._collections[current];
    fruitData.hash = this.hash(fruitData.origin);
    if (this.getFileByHash(fruitData.hash)) {
      return { cached: true, fruitData };
    } else {
      try {
        await this.addFile(fruitData);
        this.setFile(fruitData);
        return { cached: true, fruitData };
      } catch (error) {
        return { cached: true, fruitData };
      }
    }
  }

  async addFile(data) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this._path, data.hash);
      const fw = fs.createWriteStream(filePath);
      fw.on('finish', resolve);
      fw.on('error', err => {
        fs.unlinkSync(filePath);
        reject(err);
      });
      axios({
        method: 'get',
        url: data.origin,
        responseType: 'stream'
      }).then(res => {
        res.data.pipe(fw);
      });
    });
  }
}

module.exports = Storage;
