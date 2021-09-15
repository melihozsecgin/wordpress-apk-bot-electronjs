const electron = require("electron");
const path = require("path");
const ejse = require('ejs-electron')
const {app, BrowserWindow, ipcMain} = electron;
const isDev = require('electron-is-dev');

global.isDev = isDev;
global.appRoot = path.resolve(__dirname);
global.userData = isDev ? (appRoot + '/scratch') : (app.getPath('userData') + "/scratch");
global.cookiesData = isDev ? (appRoot + '/cookies') : (app.getPath('userData') + "/cookies");
global.tmpData = isDev ? (appRoot + '/tmp') : (app.getPath('temp') + "/captchasolver");
global.version = app.getVersion();

let mainWindow;

// The BrowserWindow will be ready when electron is ready
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        maxWidth: 1400,
        maxHeight: 800,
        show: true,
        minWidth: 900,
        minHeight: 800,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: false,
            enableRemoteModule: true
        }
    });

    renderHome();

    mainWindow.on('close', (event) => {
        if (app.quitting) {
            mainWindow = null
        } else {
            event.preventDefault()
            // run in background
            mainWindow.hide()
        }
    });
    mainWindow.webContents.on('did-finish-load', () => {
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    mainWindow.show()
})

app.on('before-quit', () => {
    app.quitting = true;
});

renderHome = async () => {
    try {
        await mainWindow.loadURL('file:///' + __dirname + '/app/views/home.ejs')
    } catch (e) {
        console.log(e);
    }
}
