import { PrismaClient } from '@prisma/client'
import { IpcMainEvent, IpcMainInvokeEvent, dialog } from 'electron'

export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
}

export const handleReceiveOneWayMsg = (
    event: IpcMainEvent,
    message: string
) => {
    console.log(message)
}

export const handleReceiveTwoWayMessage = (
    event: IpcMainInvokeEvent,
    message: string
) => {
    return `IPCMAIN: ${message}`
}

export const handleGetUserFromDb = async (event: IpcMainInvokeEvent) => {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany({})
    const randomUser = users[Math.floor(Math.random() * users.length + 1)]
    console.log(randomUser)
    return randomUser
}
