const todoService = require('./todo.service.js');
const logger = require('../../services/logger.service')

module.exports = {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    removeTodo,

}

async function getTodos(req, res) {
    try {
        const todo = await todoService.query()
        res.json(todo)
    } catch (err) {
        logger.error('Failed to get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
    }
}

async function getTodoById(req, res) {
    try {
        const todoId = req.params.id;
        const todo = await todoService.getById(todoId)
        res.json(todo)
    } catch (err) {
        logger.error('Failed to get todo', err)
        res.status(500).send({ err: 'Failed to get todo' })
    }
}


async function addTodo(req, res) {
    try {
        const todo = req.body
        const addedTodo = await todoService.add(todo)
        res.json(addedTodo)
    } catch (err) {
        logger.error('Failed to get todos', err)
        res.status(500).send({ err: 'Failed to get todos' })
    }
}

async function updateTodo(req, res) {
    try {
        const todo = req.body;
        console.log('todo',todo);
        const updatedTodo = await todoService.update(todo)
        res.json(updatedTodo)
    } catch (err) {
        logger.error('Failed to update todo', err)
        res.status(500).send({ err: 'Failed to update todo' })
    }
}


async function removeTodo(req, res) {
    try {
        const todoId = req.params.id;
        const removedId = await todoService.remove(todoId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove todo', err)
        res.status(500).send({ err: 'Failed to remove todo' })
    }
}

