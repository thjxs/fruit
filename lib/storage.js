const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { generateHash } = require('./utils');

class Storage {
  constructor(path) {
    this._path = path;
    this._files = new Set(fs.readdirSync(this._path));
    this._collections = JSON.parse(
      fs.readFileSync(this._path + '/collections.json')
    );
    this.notReply = false;
  }
  getFileByHash(hash) {
    return this._files.has(hash);
  }
  get fruitData() {
    return this._collections[this.current];
  }
  setFile(data) {
    this._files.add(data.hash);
  }
  queryFile(current) {
    this.current = current;
    let fruitData = this.fruitData;

    fruitData.hash = generateHash(fruitData.origin);
    if (this.getFileByHash(fruitData.hash)) {
      return { cached: true, fruitData };
    }
    return { cached: false, fruitData };
  }
  async cacheFile(current, fruitData) {
    try {
      // early handle
      const filePath = path.join(this._path, fruitData.hash);
      if (fs.existsSync(filePath)) {
        return this.notReply;
      }
      const response = await axios.get(fruitData.origin, {
        responseType: 'stream',
      });

      await this.addFile(response.data, filePath);
      this.setFile(fruitData);

      if (this.current !== current) {
        return this.notReply;
      }
      return { cached: true, fruitData };
    } catch (error) {
      return this.notReply;
    }
  }

  addFile(fileStream, filePath) {
    return new Promise((resolve, reject) => {
      const fw = fs.createWriteStream(filePath);
      fw.on('finish', resolve);
      fw.on('error', (err) => {
        fs.unlinkSync(filePath);
        reject(err);
      });
      fileStream.pipe(fw);
    });
  }
}

module.exports = Storage;
