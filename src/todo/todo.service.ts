import type { DataSource, Repository } from 'typeorm'

import { TodoEntity } from './entity/todo.entity'

import { CreateTodoDto } from './dto/create-todo.dto'

export class TodoService {
  repository: Repository<TodoEntity>

  constructor(database: DataSource) {
    this.repository = database.getRepository(TodoEntity)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({ id })
  }

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.repository.create(createTodoDto)
    return await this.repository.save(newTodo)
  }

  async delete(id: string) {
    const isExist = await this.repository.existsBy({ id })
    return isExist ? await this.repository.delete(id) : null
  }
}
