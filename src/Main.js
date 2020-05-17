const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 720,
    webPreferences: {nodeIntegration: true }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
};


const saveBoard = () => {
  
}

const loadBoard = () => {
  
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        role: 'reload'
      },
      {
        label: "Save As",
        click(){
          saveBoard();
        }
      },
      {
        label: "Load",
        click(){
          loadBoard();
        }
      }
    ]
  }
]

if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: '',
    accelerator: 'F12',
    click(item, focusedWindow) {
      focusedWindow.toggleDevTools();
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
