const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const preloadPath = path.join(__dirname, "preload.js");
  const htmlPath = path.join(__dirname, "src", "index.html");

  console.log("Preload Path:", preloadPath);
  console.log("HTML Path:", htmlPath);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
    },
  });

  win.loadFile(htmlPath).catch((err) => {
    console.error("Failed to load HTML file:", err);
  });

  // 개발자 도구 활성화
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  console.log("App is ready");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
