import { PrismaClient } from '@prisma/client'
import { IpcMainEvent, IpcMainInvokeEvent, dialog } from 'electron'
import { buildPrismaClient } from './prisma.util'

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
    const prisma = buildPrismaClient()
    const users = await prisma.user.findMany({})
    const randomUser = users[Math.floor(Math.random() * users.length)]
    console.log(randomUser)
    return randomUser
}

export const handlePrismaCreateUser = async (event: IpcMainInvokeEvent) => {
    console.log('Creating new user')
    const prisma = buildPrismaClient()
    const count = await prisma.user.count({})
    await prisma.user.create({
        data: {
            email: `email-${count + 1}`,
            name: `name-${count + 1}`,
        },
    })
}

export const handlePrismaButtonRequest = async (event: IpcMainInvokeEvent) => {
    console.log('Main Thread: Requesting all user data through IPC.')
    const prisma = buildPrismaClient()
    return JSON.stringify(await prisma.user.findMany({}))
}

