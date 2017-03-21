const { app, BrowserWindow } = require('electron');
const path = require('path');

const fs = require('fs');

function createWindow(){

  app.server = require(path.join(__dirname, 'server.js'));
  let win = new BrowserWindow();
  win.loadURL('http://localhost:3000');
  win.focus();

  win.on('closed', ()=>{
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})
