const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let reportWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (!reportWindow) {
      createReportWindow();
    }
  });
}

function createReportWindow() {
  reportWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  reportWindow.loadFile('report.html');

  reportWindow.on('closed', () => {
    reportWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('generate-report', () => {
  if (!reportWindow) {
    createReportWindow();
  }
});

