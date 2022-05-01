import { Client } from "./s3.client.js"
import { FileSystemAPI } from '../../api/filesystem/api.d'
import { Obj, PresignedUrl } from '../../interfaces.js'
import { Path } from './path.js'
import { Provider } from '../../provider.js'

import * as repository from './s3.repository.js'

export const newConnection = async (
  provider: Provider,
  _userId: string
): Promise<FileSystemAPI> => {

  const minio = await new Client({
    endPoint: provider.credentials.endPoint,
    port: provider.credentials.port,
    useSSL: false,
    accessKey: provider.credentials.accessKey,
    secretKey: provider.credentials.secretKey,
  })

  const connection: FileSystemAPI = {
    async get(path): Promise<Obj> {
      return await repository.get(new Path(path.toString()), minio)
    },
    async destroy(path): Promise<void> {
      await repository.destroy(new Path(path.toString()), minio)
    },
    async upload(name, parents): Promise<PresignedUrl> {
      const path = new Path(parents[0].toString() + name)
      return await repository.upsert(path, minio)
    },
    async move(oldPath, newPath) {
      return await repository.move(new Path(oldPath.toString()), new Path(newPath.toString()), minio)
    },
    async rename(path, newName) {
      await Promise.reject()
    },
    async getContainerContent(path): Promise<Obj[]> {
      return await repository.getContainerContent(new Path(path.toString()), minio)
    },
    async createContainer(name, parents): Promise<void> {
      const path = new Path(parents[0].toString() + name)
      await repository.createContainer(path, minio)
    },
    async destroyContainer(path): Promise<void> {
      await repository.destroyContainer(new Path(path.toString()), minio)
    },
    async getMetadata(path): Promise<Obj> {
      return await repository.getMetadata(new Path(path.toString()), minio)
    },
  }

  return connection
}
