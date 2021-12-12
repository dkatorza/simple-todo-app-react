const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const Todo = require('../../models/Todo')
const { set } = require('mongoose')
module.exports = {
    remove,
    query,
    getById,
    add,
    update
}


async function query(filterBy) {
    try {
        if (!filterBy.title) {
            filterBy.title =''
        }
        const criteria = _buildCriteria(filterBy)
        const sortCriteria = _buildSortCriteria(filterBy)
        const todos = await Todo.find(criteria).sort(sortCriteria)
        console.log('tt',todos);
        return todos
    } catch (err) {
        logger.error('cannot find todos', err)
        throw err
    }
}

async function getById(todoId) {
    try {
        const todo = await Todo.findById(todoId)
        return todo
    } catch (err) {
        logger.error(`while finding todo ${todoId}`, err)
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

async function update(todo) {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todo._id,{$set:{...todo}})
        return updatedTodo
    } catch (err) {
        logger.error(`cannot update todo ${todo._Id}`, err)
        throw err
    }
}


async function remove(todoId) {
    try {
        const result = await Todo.findByIdAndDelete(todoId)
        return result
    } catch (err) {
        logger.error(`cannot remove Todo ${todoId}`, err)
        throw err
    }
}

function _buildSortCriteria(filterBy) {
    switch (filterBy.criteria) {
        case 'created-new-to-old': return { timestamp: 'asc' }
        case 'created-old-to-new': return { timestamp: 'desc' }
        case 'name-a-to-z': return { text: 'asc' }
        case 'name-z-to-a': return { text: 'desc' }
        default: return {}
    }
}


function _buildCriteria(filterBy) {
    if ((Object.keys(filterBy).length === 0)) return {}
    var criteria = {};
    const regex = new RegExp(filterBy.title, 'i');
    criteria = { text: regex }
    return criteria
}
