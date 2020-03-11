const fs = require('fs')
const path = require('path')
const crypto = require('crypto');
const request = require('request')

class Storage {
  constructor(path) {
    this._path = path
    this._files = this.loadFiles()
    this._hash = crypto.createHash('md5', {
      outputLength: 16
    });
  }
  loadFiles() {
    return new Set(fs.readdirSync(this._path))
  }
  getFileByHash(hash) {
    return this._files.has(hash)
  }
  setFile(hash) {
    this._files.add(hash)
  }
  hash(url) {
    const hash = crypto.createHash('md5', {
      outputLength: 16
    })
    hash.update(url)
    return hash.digest('hex')
  }
  async cacheFile(url) {
    let hash = this.hash(url)
    if (this.getFileByHash(hash)) {
      return {cached: true, hash}
    } else {
      try {
        await this.addFile(url, hash)
        this.setFile(hash)
        return {cached: true, hash}
      } catch (error) {
        return {cached: false, hash}
      }
    }
  }

  async addFile(uri, hash) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this._path, hash)
      const fw = fs.createWriteStream(filePath)
      fw.on('finish', resolve)
      fw.on('error', err => {
        fs.unlinkSync(filePath)
        reject(err)
      })
      const req = request({
        method: 'GET',
        uri
      })
      req.pipe(fw)
    })
  }
}

module.exports = Storage
