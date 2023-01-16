import { ipcMain, shell } from 'electron'

ipcMain.on('open-external-url', (_, params) => {
  const { url } = params

  shell.openExternal(url)
})
