const { app, ipcMain, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);

const path = require("path");
const util = require("util");
const fs = require("fs");

const stat = util.promisify(fs.stat);
let mainWindow;
app.on("ready", () => {
  const htmlPath = path.join("src", "index.html");
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(htmlPath);
});

ipcMain.on("files", async (event, filesArr) => {
  try {
    console.log(filesArr);
    const data = await Promise.all(
      filesArr.map(async ({ name, pathName }) => ({
        ...(await stat(pathName)),
        name,
        pathName
      }))
    );
    mainWindow.webContents.send("metadata", data);
  } catch (error) {
    mainWindow.webContents.send("metadata:error", error);
  }
});
