const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const createWindow = require('./lib/createWindow');
const Storage = require('./lib/storage');

const imagePath = path.join(__dirname, 'images');
// make sure image path exists
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath);
}

const imageStorage = new Storage(imagePath);

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
