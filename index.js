const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const storage = require('./lib/storage')

const imageStorage = new storage(path.join(__dirname, 'images'))

ipcMain.on('loadImage', async (e, current) => {
  let msg = await imageStorage.cacheFile(current)
  e.reply('cached', msg)
})

ipcMain.on('max', () => {
  win.maximize()
})
ipcMain.on('unmax', () => {
  win.unmaximize()
})
ipcMain.on('min', () => {
  win.minimize()
})
ipcMain.on('close', () => {
  win.close()
})
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'favicon.ico',
    frame: false,
    backgroundColor: '#2e2c29',
    webPreferences: {
      devTools: true,
      nodeIntegration: true
    }
  })
  win.webContents.openDevTools()
  win.loadURL('http://localhost:8080')

  win.on('closed', function () {
    win = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
