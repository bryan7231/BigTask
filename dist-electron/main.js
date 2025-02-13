var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ipcMain, app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { uIOhook } from "uiohook-napi";
class KeyboardEvent {
  constructor(s, t, k) {
    __publicField(this, "state");
    __publicField(this, "time");
    __publicField(this, "key");
    this.state = s;
    this.time = t;
    this.key = k;
  }
}
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 125,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    // resizable: false, 
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.setMenuBarVisibility(false);
  win.on("resize", () => {
    const [width, height] = win == null ? void 0 : win.getSize();
    console.log(`Width: ${width}, Height: ${height}`);
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.on("terminal-log", (_event, message) => {
  console.log(message);
});
ipcMain.on("start-logging", () => {
  uIOhook.start();
});
ipcMain.on("stop-logging", () => {
  uIOhook.stop();
});
ipcMain.handle("get-time", () => {
  return Date.now();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
void app.whenReady().then(() => {
  createWindow();
  uIOhook.on("keydown", (event) => {
    const data = new KeyboardEvent("down", Date.now(), event.keycode);
    win == null ? void 0 : win.webContents.send("key-event", data);
  });
  uIOhook.on("keyup", (event) => {
    const data = new KeyboardEvent(event.type, Date.now(), event.keycode);
    win == null ? void 0 : win.webContents.send("key-event", data);
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
