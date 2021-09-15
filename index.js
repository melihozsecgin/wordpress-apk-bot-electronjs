const electron = require("electron");
const path = require("path");
const ejse = require('ejs-electron')
const {app, BrowserWindow, ipcMain} = electron;
const isDev = require('electron-is-dev');

let mainWindow;

// The BrowserWindow will be ready when electron is ready
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
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

    /*var current_user = getCurrentUser();
    if (current_user) {
        renderStores();
    } else {
        renderLogin();
    }*/
    renderHome();

    //require('./app/menu');
    //defaultInitializers();

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
        //autoUpdater.init(mainWindow)
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
        //handleErrors(e);
    }
}
