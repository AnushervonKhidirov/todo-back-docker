import type { TTodo, TTodoBody } from '../type/todo'

import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuid } from 'uuid'

const todoJsonPath = 'db/todos.json'

export class Todo {
    async findAll() {
        const totoListJson = await readFile(join(process.cwd(), todoJsonPath), { encoding: 'utf-8' })
        const todoList = JSON.parse(totoListJson) as TTodo[]

        return todoList
    }

    async create(todo: TTodoBody) {
        const totoListJson = await readFile(join(process.cwd(), todoJsonPath), { encoding: 'utf-8' })
        const todoList = JSON.parse(totoListJson) as TTodo[]

        const newTodo = { ...todo, id: uuid() }

        todoList.push(newTodo)

        await writeFile(join(process.cwd(), todoJsonPath), JSON.stringify(todoList), { encoding: 'utf-8' })

        return newTodo
    }

    async delete(id: string) {
        const totoListJson = await readFile(join(process.cwd(), todoJsonPath), { encoding: 'utf-8' })
        const todoList = JSON.parse(totoListJson) as TTodo[]
        const removedTodo = todoList.find(todo => todo.id === id)
        const newTodoList = todoList.filter(todo => todo.id !== id)

        await writeFile(join(process.cwd(), todoJsonPath), JSON.stringify(newTodoList), { encoding: 'utf-8' })

        return removedTodo
    }
}
