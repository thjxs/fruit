const { BrowserWindow } = require('electron');
const Rpc = require('./rpc');

module.exports = function createWindow(win, imageStorage) {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: '#2e2c29',
    webPreferences: {
      devTools: true,
      nodeIntegration: true
    }
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:8080');

  win.on('closed', function() {
    win = null;
  });
  const rpc = new Rpc(win);
  rpc.on('loadImg', async data => {
    let r = await imageStorage.cacheFile(data);
    rpc.send('cached', r);
  });
  rpc.on('max', () => {
    win.maximize();
  });
  rpc.on('unmax', () => {
    win.unmaximize();
  });
  rpc.on('min', () => {
    win.minimize();
  });
  rpc.on('close', () => {
    win.close();
  });
};