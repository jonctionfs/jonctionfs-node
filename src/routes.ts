import fileSystemAPI from './api/filesystem/api.js'
import { Request, Response } from 'express'

interface Interfaces {
  filesystem: any
}

const requestInterfaces: Interfaces = {
  filesystem : fileSystemAPI
}

export const actionHandler = async (req: Request, res: Response) => {
  const requestApi: string = req.headers.api as string
  const requestAction: string = req.headers.action as string
  const user: string = req.headers['authenticated-user'] as string
  const providerCredentials: string = req.headers['provider-credentials'] as string
  const providerType: string = req.headers['provider-type'] as string
  
  const body = req.body

  const provider = {
    type: providerType,
    credentials: JSON.parse(providerCredentials)
  }
  
  try {
    const response = await requestInterfaces[requestApi as keyof Interfaces].api(user, body, provider, requestAction)
    res.status(response.status).json(response.body)
  } catch (e) {
    console.error(e)
    res.status(500)
  }
}