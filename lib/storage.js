const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

class Storage {
  constructor(path) {
    this._path = path;
    this._files = this.loadFiles();
    this._collections = this.loadCollections();
    this.notReply = false;
    this._hash = crypto.createHash('md5', {
      outputLength: 16,
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
  getFruitData() {
    return this._collections[this.current];
  }
  setFile(data) {
    this._files.add(data.hash);
  }
  hash(url) {
    const hash = crypto.createHash('md5', {
      outputLength: 16,
    });
    hash.update(url);
    return hash.digest('hex');
  }
  async cacheFile(current) {
    this.current = current;
    let fruitData = this.getFruitData();
    fruitData.hash = this.hash(fruitData.origin);
    if (this.getFileByHash(fruitData.hash)) {
      return { cached: true, fruitData };
    } else {
      try {
        // early handle
        const filePath = path.join(this._path, fruitData.hash);
        if (fs.existsSync(filePath)) {
          return this.notReply;
        }
        await this.addFile(fruitData, filePath);
        this.setFile(fruitData);
        if (this.current !== current) {
          return this.notReply;
        }
        return { cached: true, fruitData };
      } catch (error) {
        return this.notReply;
      }
    }
  }

  addFile(data, filePath) {
    return new Promise((resolve, reject) => {
      const fw = fs.createWriteStream(filePath);
      fw.on('finish', resolve);
      fw.on('error', (err) => {
        fs.unlinkSync(filePath);
        reject(err);
      });
      axios({
        method: 'get',
        url: data.origin,
        responseType: 'stream',
      }).then((res) => {
        res.data.pipe(fw);
      });
    });
  }
}

module.exports = Storage;
