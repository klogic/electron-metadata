const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
app.on("ready", () => {
  const htmlPath = path.join("src", "index.html");
  mainWindow = new BrowserWindow();
  mainWindow.loadFile(htmlPath);
});
