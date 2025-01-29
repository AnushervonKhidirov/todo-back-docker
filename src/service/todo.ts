import type { DataSource, Repository } from 'typeorm'

import { Todo } from '../db/entity/Todo'
import { v4 as uuid } from 'uuid'

export class TodoService {
    database: DataSource
    repository: Repository<Todo>

    constructor(database: DataSource) {
        this.database = database
        this.repository = this.database.getRepository(Todo)
    }

    async findAll() {
        return await this.repository.find()
    }

    async findOne(id: string) {
        return await this.repository.findOneBy({ id })
    }

    async create({ text }: { text: string }) {
        const newTodo = {
            id: uuid(),
            text: text,
            created_at: new Date(),
        }

        return await this.repository.save(newTodo)
    }

    async delete(id: string) {
        const isExist = await this.repository.existsBy({ id })
        return isExist ? await this.repository.delete(id) : null
    }
}
