import { BrowserWindow, ipcMain, shell } from 'electron'

ipcMain.on('window.minimize', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender)

  if (!browserWindow) {
    return
  }

  browserWindow.minimize()
})

ipcMain.on('window.toggle-maximize', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender)

  if (!browserWindow) {
    return
  }

  if (browserWindow.isMaximized()) {
    browserWindow.unmaximize()
  } else {
    browserWindow.maximize()
  }
})

ipcMain.on('window.close', (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender)

  if (!browserWindow) {
    return
  }

  browserWindow.close()
})

ipcMain.on('openExternalUrl', (_, data) => {
  shell.openExternal(data.url)
})
