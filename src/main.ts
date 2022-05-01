import 'dotenv/config'
import { actionHandler } from './routes.js'
import express from 'express'

const app = express();

app.use(express.json());

app.post('*', async (req, res) => {
  await actionHandler(req,res)
})

app.listen(process.env.APP_PORT, () => {
  console.info(`JonctionFS server listening at http://localhost:${process.env.APP_PORT}`)
})