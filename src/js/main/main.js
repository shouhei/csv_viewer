'use strict';

import electron from 'electron';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
import SepalatedText from './../common/sepalated_text';
let mainWindow;

export default SepalatedText;

console.log('electron version:' + process.versions.electron);

function createWindow(){
    mainWindow = new BrowserWindow(
        {
            fullscreenable: true,
            'enable-larger-than-screen': true,
            titleBarStyle: 'hidden'
        }
    );
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('active', function(){
    if (mainWindow === null){
        createWindow();
    }
});
