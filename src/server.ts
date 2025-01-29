import 'dotenv/config'
import 'reflect-metadata'

import type { DataSource } from 'typeorm'
import type { Request } from 'express'

import express from 'express'

import { AppDataSource } from './db/data-source'
import { TodoService } from './service/todo'

AppDataSource.initialize()
    .then(dataSource => {
        main(dataSource)
    })
    .catch(err => {
        console.log(err)
    })

function main(dataSource: DataSource) {
    const app = express()
    const todoService = new TodoService(dataSource)

    app.use(express.json())

    app.get('/todos', async (req, res) => {
        const response = await todoService.findAll()
        res.status(200).send(response)
    })

    app.get('/todo/:id', async (req: Request<{ id: string }>, res) => {
        const todo = await todoService.findOne(req.params.id)
        if (todo) res.status(200).send(todo)
        res.status(400).send()
    })

    app.post('/todo', async (req: Request<{}, {}, { text: string }>, res) => {
        const newTodo = await todoService.create(req.body)
        res.status(200).send(newTodo)
    })

    app.delete('/todo/:id', async (req: Request<{ id: string }>, res) => {
        const todo = await todoService.delete(req.params.id)
        if (todo) res.status(200).send()
        res.status(400).send()
    })

    app.listen(4000)
}
