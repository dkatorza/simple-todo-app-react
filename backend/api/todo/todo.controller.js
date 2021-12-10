const todoService = require('./todo.service.js');
const logger = require('../../services/logger.service')

// getTodos, getTodoById, addTodo, updateTodo, removeTodo
module.exports = {
    getTodos,
    // getToyById,
    addTodo,
    // updateToy,
    // removeToy,

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
