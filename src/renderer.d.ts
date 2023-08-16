import { ipcRenderer } from 'electron'

export interface IElectronAPI {
    openFile: () => Promise<string>
    sendMessage: (message) => Promise<void>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
