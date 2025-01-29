import type { Request } from 'express'

import express from 'express'

import { Todo } from './service/todo'
import { TTodoBody } from './type/todo'

const app = express()
const todoService = new Todo()

app.use(express.json())

app.get('/todos', async (req, res) => {
    const allTodos = await todoService.findAll()
    res.status(200).send(allTodos)
})

app.post('/todo', async (req: Request<{}, {}, TTodoBody>, res) => {
    const addedTodo = await todoService.create(req.body)
    if (addedTodo) res.status(200).send(addedTodo)
    res.status(500).send()
})

app.delete('/todo/:id', async (req: Request<{ id: string }, {}, TTodoBody>, res) => {
    const removedTodo = await todoService.delete(req.params.id)
    if (removedTodo) res.status(200).send(removedTodo)
    res.status(500).send()
})

app.listen(4000)
