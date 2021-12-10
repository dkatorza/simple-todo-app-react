const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const Todo = require('../../models/Todo')
module.exports = {
    // remove,
    query,
    // getById,
    add,
    // update,
}


async function query() {
    try {
        const todos = await Todo.find()
        return todos
    } catch (err) {
        logger.error('cannot find todos', err)
        throw err
    }
}

async function add(newTodo) {
    try {
        const todo = await new Todo({
            text: newTodo.text
        })
        todo.save()
        return todo
    } catch (err) {
        logger.error('cannot insert todo', err)
        throw err
    }
}
