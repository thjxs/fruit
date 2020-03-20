const { EventEmitter } = require('events');
const { ipcMain } = require('electron');
const uuidv4 = require('uuid').v4;

class Server extends EventEmitter {
  constructor(win) {
    super();
    this.win = win;
    this.uid = uuidv4();
    this.ipcListener = this.ipcListener.bind(this);
    ipcMain.on(this.uid, this.ipcListener);
    this.wc.on('did-finish-load', () => {
      this.wc.send('init', this.uid);
    });
  }

  ipcListener(event, { ev, data }) {
    this.emit(ev, data);
  }

  get wc() {
    return this.win.webContents;
  }

  send(ch, data) {
    this.wc.send(this.uid, { ch, data });
  }
}

module.exports = Server;
