const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { generateHash } = require('./utils');
const { notify } = require('./notification');

class Storage {
  constructor(path) {
    this.imagePath = path;
    // 32bit hex
    this.imgSet = new Set(fs.readdirSync(this.imagePath));
    this.imgCollections = JSON.parse(
      fs.readFileSync(this.imagePath + '/collections.json')
    );
    this.notReply = false;
  }
  getFileByHash(hash) {
    return this.imgSet.has(hash);
  }
  get fruitData() {
    return this.imgCollections[this.current];
  }
  setFile(data) {
    this.imgSet.add(data.hash);
  }
  queryFile(current) {
    this.current = current;

    this.fruitData.hash = `${generateHash(this.fruitData.origin)}.jpg`;

    if (this.getFileByHash(this.fruitData.hash)) {
      return { cached: true, fruitData: this.fruitData };
    }
    return { cached: false, fruitData: this.fruitData };
  }
  async cacheFile(current, fruitData) {
    try {
      // early handle
      const filePath = path.join(this.imagePath, fruitData.hash);
      if (fs.existsSync(filePath)) {
        return this.notReply;
      }
      const response = await axios.get(fruitData.origin, {
        responseType: 'stream',
      });

      await this.addFile(response.data, filePath);
      notify(`Image stored`);
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
