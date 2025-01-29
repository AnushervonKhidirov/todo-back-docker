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
    const allTodos = await todoService.findAll()
    if (allTodos) res.status(200).send(allTodos)
    res.status(500).send()
})

app.get('/todo/:id', async (req: Request<{ id: string }>, res) => {
    const todo = await todoService.findOne(req.params.id)
    if (todo) res.status(200).send(todo)
    res.status(500).send()
})

app.post('/todo', async (req: Request<{}, {}, TTodoBody>, res) => {
    const addedTodo = await todoService.create(req.body)
    if (addedTodo) res.status(200).send(addedTodo)
    res.status(500).send()
})

app.delete('/todo/:id', async (req: Request<{ id: string }>, res) => {
    const removedTodo = await todoService.delete(req.params.id)
    if (removedTodo) res.status(200).send(removedTodo)
    res.status(500).send()
})

app.listen(4000)
