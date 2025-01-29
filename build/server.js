"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("./service/todo");
const app = (0, express_1.default)();
const todoService = new todo_1.Todo();
app.use(express_1.default.json());
app.get('/todos', async (req, res) => {
    const allTodos = await todoService.findAll();
    res.status(200).send(allTodos);
});
app.post('/todo', async (req, res) => {
    const addedTodo = await todoService.create(req.body);
    if (addedTodo)
        res.status(200).send(addedTodo);
    res.status(500).send();
});
app.delete('/todo/:id', async (req, res) => {
    const removedTodo = await todoService.delete(req.params.id);
    if (removedTodo)
        res.status(200).send(removedTodo);
    res.status(500).send();
});
app.listen(4000);
