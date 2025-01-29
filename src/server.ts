import type { Request } from 'express'
import type { TTodoBody } from './type/todo'

import express from 'express'
import 'dotenv/config'

import DataBase from './service/data-base'
import { Todo } from './service/todo'

const db = new DataBase()

db.connect()

const app = express()
const todoService = new Todo(db)

app.use(express.json())

app.get('/todos', async (req, res) => {
    const response = await todoService.findAll()
    const sendData = response.status === 200 ? response.data : response.message

    res.status(response.status).send(sendData)
})

app.get('/todo/:id', async (req: Request<{ id: string }>, res) => {
    const response = await todoService.findOne(req.params.id)
    const sendData = response.status === 200 ? response.data : response.message

    res.status(response.status).send(sendData)
})

app.post('/todo', async (req: Request<{}, {}, TTodoBody>, res) => {
    const response = await todoService.create(req.body)
    const sendData = response.status === 200 ? response.data : response.message

    res.status(response.status).send(sendData)
})

app.delete('/todo/:id', async (req: Request<{ id: string }>, res) => {
    const response = await todoService.delete(req.params.id)
    const sendData = response.status === 200 ? response.data : response.message

    res.status(response.status).send(sendData)
})

app.listen(4000)
