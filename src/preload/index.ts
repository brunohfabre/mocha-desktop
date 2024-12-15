import { contextBridge, ipcRenderer } from 'electron'

declare global {
  export interface Window {
    api: typeof api
  }
}

export const api = {
  window: {
    minimize() {
      ipcRenderer.send('window.minimize')
    },
    toggleMaximize() {
      ipcRenderer.send('window.toggle-maximize')
    },
    close() {
      ipcRenderer.send('window.close')
    },
  },
  openExternalUrl(url: string) {
    ipcRenderer.send('openExternalUrl', { url })
  },
  onDeepLink: (callback) =>
    ipcRenderer.on('deep-link', (_, data) => callback(data)),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
