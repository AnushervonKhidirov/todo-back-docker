import type { TTodo, TTodoBody } from '../type/todo'

import { format } from 'mysql2'
import { v4 as uuid } from 'uuid'

import DataBase from './data-base'
import Status from './status'

export class Todo {
    db: DataBase
    status: Status
    tableName: string = '`todos`'

    constructor(db: DataBase) {
        this.db = db
        this.status = new Status()
    }

    async findAll() {
        return await this.db.query<TTodo[]>(`SELECT * FROM ${this.tableName}`)
    }

    async findOne(id: string) {
        const query = format(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id])
        const result = await this.db.query<TTodo[]>(query)

        if (result.status === 200 && result.data[0]) return this.status.ok(result.data[0])
        return this.status.notFound(`Unable to find todo with id: ${id}`)
    }

    async create(todo: TTodoBody) {
        const newTodo = { id: uuid(), text: todo.text }
        const query = format(`INSERT INTO ${this.tableName} (id, text) VALUES (?, ?)`, [newTodo.id, newTodo.text])
        const result = await this.db.query(query)

        if (result.status === 200) return this.status.ok<TTodo>(newTodo)
        return this.status.serverError('Unable to add todo')
    }

    async delete(id: string) {
        const query = format(`DELETE FROM ${this.tableName} WHERE id = ?`, [id])
        const result = await this.db.query(query)

        if (result.status === 200) return this.status.ok({ id, message: 'Todo removed successfully' })
        return this.status.serverError(`Unable to remove todo with id: ${id}`)
    }
}
