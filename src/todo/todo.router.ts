import type { DataSource } from 'typeorm'
import { Router } from 'express'
import { TodoController } from './todo.controller'

export class TodoRouter {
  router: Router
  controller: TodoController

  constructor(dataSource: DataSource) {
    this.router = Router()
    this.controller = new TodoController(dataSource)
  }

  init() {
    this.router.get('/', this.controller.findAll.bind(this.controller))
    this.router.get('/:id', this.controller.findOne.bind(this.controller))
    this.router.post('/', this.controller.create.bind(this.controller))
    this.router.delete('/:id', this.controller.delete.bind(this.controller))

    return this.router
  }
}
