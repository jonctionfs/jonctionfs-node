import { newConnection as newS3Connection } from './S3/s3.js'
import { newConnection as newGoogleDriveConnection } from './GoogleDrive/googledrive.js'

import { Provider } from '../provider'

export const findConnection = async (provider: Provider, userId: string) => {
  switch (provider.type) {
    case 'GoogleDrive':
      return newGoogleDriveConnection(provider, userId)
      
    default:
    case 'S3':
      return newS3Connection(provider, userId)
  }
}