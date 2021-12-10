import { httpService } from './http.service'

export const todoService = {
    query,
    getById,
    save,
    remove,
}



async function query(filterBy) {
    const filter = await httpService.get('todo', filterBy)
    return filter
}


async function getById(todoId) {
    return await httpService.get(`todo/${todoId}`)
}


async function remove(todoId) {
    return await httpService.delete(`todo/${todoId}`)
}


async function save(todo) {
    if (todo._id) {
        try {
            return await httpService.put(`todo/${todo._id}`, todo)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await httpService.post('todo', todo)
        } catch (err) {
            throw err
        }
    }

}
