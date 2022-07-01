import { Client as MinioClient, CopyConditions } from 'minio'

interface Config {
  endPoint: string
  port: number
  useSSL: boolean
  accessKey: string
  secretKey: string
}

export class Client {
  #client: MinioClient

  constructor(config: Config) {
    this.#client = new MinioClient(config);
  }

  async presignedGetObject(bucket: string, path: string): Promise<string> {
    const presignedUrl = await this.#client.presignedGetObject(bucket, path)

    return presignedUrl
  }

  async removeObject(bucket: string, path: string): Promise<void> {
    this.#client.removeObject(bucket, path)
  }

  async presignedPutObject(bucket: string, path: string, expiry: number): Promise<string> {
    const presignedUrl = await this.#client.presignedPutObject(bucket, path)
        
    return presignedUrl
  }

  async putObject(bucket: string, path: string, object: any): Promise<void> {
    this.#client.putObject(bucket, path, object)
  }

  async listObjectsV2(bucket: string, path: string, recursive = false): Promise<any> {
    const objectStream = this.#client.listObjectsV2(bucket, path)

    const children = []
    for await (const child of objectStream) {
      children.push(child)
    }

    return children
  }

  async listBuckets(): Promise<any> {
    const buckets = await this.#client.listBuckets()

    return buckets
  }

  async removeObjects(bucket: string, paths: string[]): Promise<void> {
    this.#client.removeObjects(bucket, paths)
  }

  async statObject(bucket: string, path: string): Promise<any> {
    // this.#client.statObject(bucket, path)
  }

  async copyObject(bucket: string, newPath: string, oldPath: string): Promise<void> {
    const copyConditions = new CopyConditions()
        
    this.#client.copyObject(bucket, newPath, oldPath, copyConditions)
  }
}