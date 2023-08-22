import { ipcRenderer } from 'electron'

export interface IElectronAPI {
    openFile: () => Promise<string>
    sendMessage: (message) => Promise<void>
    sendTwoWayMessage: (message) => Promise<string>
    getUserFromDb: () => Promise<string>,
    createUserByPrima:()=>Promise<void>,
    getUsersByPrisma:()=>Promise<string>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
