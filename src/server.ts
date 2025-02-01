import 'dotenv/config'
import 'reflect-metadata'

import type { DataSource } from 'typeorm'

import express from 'express'

import { AppDataSource } from './data-source/data-source'
import { TodoRouter } from './todo/todo.router'


AppDataSource.initialize()
  .then(dataSource => {
    runServer(dataSource)
  })
  .catch(err => {
    console.log(err)
  })

function runServer(dataSource: DataSource) {
  const app = express()
  const todoRouter = new TodoRouter(dataSource).init()

  app.use(express.json())
  app.use('/todos', todoRouter)

  app.listen(4000)
}
