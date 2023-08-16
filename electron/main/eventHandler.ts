import { dialog } from "electron"

export async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return filePaths[0]
    }
  }

