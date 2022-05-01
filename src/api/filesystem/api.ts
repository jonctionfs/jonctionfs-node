import { findConnection as findConnectionInject } from '../../connections/connections.js'

import { FileSystemAction } from './api.d'
import { getFile, uploadFile, saveFile, destroyFile, getMetadataFile, moveFile, rename } from './controllers/file.js'
import { getFolder, createFolder, destroyFolder, moveFolder } from './controllers/folder.js'
import { Provider } from '../../provider.js'

export const actions = {
  getFile,
  uploadFile,
  saveFile,
  destroyFile,
  getMetadataFile,
  moveFile,
  getFolder,
  createFolder,
  destroyFolder,
  moveFolder,
  rename
}

export default {
  api: async (userId: string, body: any, provider: Provider, action: string, findConnection = findConnectionInject) => {
    const connection = await findConnection(provider, userId)
    
    return await actions[action as keyof FileSystemAction](connection, body)
  }
}
