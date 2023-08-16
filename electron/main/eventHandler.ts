import { IpcMainEvent, IpcMainInvokeEvent, dialog } from 'electron'

export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
}

export const handleReceiveOneWayMsg = (event: IpcMainEvent, message: string) => {
    console.log(message)
}

export const handleReceiveTwoWayMessage = (event: IpcMainInvokeEvent, message: string) => {
    return `IPCMAIN: ${message}`
}
