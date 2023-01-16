import { contextBridge, ipcRenderer } from 'electron'

import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {
  on: (path: string, cb: any) => ipcRenderer.on(path, cb),
  openExternalUrl(url: string) {
    ipcRenderer.send('open-external-url', {
      url,
    })
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
