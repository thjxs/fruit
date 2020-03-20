const { app } = require('electron');
const path = require('path');
const createWindow = require('./lib/createWindow');
const Storage = require('./lib/storage');

const imageStorage = new Storage(path.join(__dirname, 'images'));

let win;

app.on('ready', () => {
  createWindow(win, imageStorage);
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (win === null) {
    createWindow(win, imageStorage);
  }
});
