import type { TTodo, TTodoBody } from '../type/todo'

import { format } from 'mysql2'
import { v4 as uuid } from 'uuid'

import DataBase from './data-base'

export class Todo {
    db: DataBase

    constructor(db: DataBase) {
        this.db = db
    }

    async findAll() {
        return await this.db.query('SELECT * FROM `todos`')
    }

    async findOne(id: string) {
        const query = format('SELECT * FROM `todos` WHERE id = ?', [id])
        const result = (await this.db.query(query)) as TTodo[] | null

        return result ? result[0] : null
    }

    async create(todo: TTodoBody) {
        const newTodo = { id: uuid(), text: todo.text }
        const query = format('INSERT INTO `todos` (id, text) VALUES (?, ?)', [newTodo.id, newTodo.text])
        const result = await this.db.query(query)

        return result ? newTodo : null
    }

    async delete(id: string) {
        const query = format('DELETE FROM `todos` WHERE id = ?', [id])
        const result = await this.db.query(query)

        return result ? { id, message: 'Todo removed successfully' } : null
    }
}
