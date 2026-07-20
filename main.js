const { app, BrowserWindow } = require('electron');
const path = require('path');
const config = require('./config.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'icon.ico'),
    title: "Controles Operacionais GFL",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.setMenu(null);
  win.setMenuBarVisibility(false);
  win.maximize();
  // Carrega a URL definida no config.json
  win.loadURL(config.url);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
