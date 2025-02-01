import type { Request, Response } from 'express'
import type { DataSource } from 'typeorm'

import { NotFound } from 'http-errors'

import { TodoService } from './todo.service'

import { CreateTodoDto } from './dto/create-todo.dto'

export class TodoController {
  todoService: TodoService

  constructor(dataSource: DataSource) {
    this.todoService = new TodoService(dataSource)
  }

  async findOne(req: Request<{ id: string }>, res: Response) {
    const response = await this.todoService.findOne(req.params.id)

    if (!response) {
      const exception = NotFound()
      res.status(exception.status).send(exception)
    }

    res.status(200).send(response)
  }

  async findAll(req: Request, res: Response) {
    const response = await this.todoService.findAll()
    res.status(200).send(response)
  }

  async create(req: Request<{}, {}, CreateTodoDto>, res: Response) {
    const createTodoDto = req.body
    const todo = await this.todoService.create(createTodoDto)
    res.status(200).send(todo)
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const todo = await this.todoService.delete(req.params.id)

    if (!todo) {
      const exception = NotFound()
      res.status(exception.status).send(exception)
    }

    res.status(200).send()
  }
}
