"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const uuid_1 = require("uuid");
const todoJsonPath = 'db/todos.json';
class Todo {
    async findAll() {
        const totoListJson = await (0, promises_1.readFile)((0, path_1.join)(process.cwd(), todoJsonPath), { encoding: 'utf-8' });
        const todoList = JSON.parse(totoListJson);
        return todoList;
    }
    async create(todo) {
        const totoListJson = await (0, promises_1.readFile)((0, path_1.join)(process.cwd(), todoJsonPath), { encoding: 'utf-8' });
        const todoList = JSON.parse(totoListJson);
        const newTodo = { ...todo, id: (0, uuid_1.v4)() };
        todoList.push(newTodo);
        await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), todoJsonPath), JSON.stringify(todoList), { encoding: 'utf-8' });
        return newTodo;
    }
    async delete(id) {
        const totoListJson = await (0, promises_1.readFile)((0, path_1.join)(process.cwd(), todoJsonPath), { encoding: 'utf-8' });
        const todoList = JSON.parse(totoListJson);
        const removedTodo = todoList.find(todo => todo.id === id);
        const newTodoList = todoList.filter(todo => todo.id !== id);
        await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), todoJsonPath), JSON.stringify(newTodoList), { encoding: 'utf-8' });
        return removedTodo;
    }
}
exports.Todo = Todo;
