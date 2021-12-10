const express = require('express')
const { getTodos,addTodo } = require('./todo.controller')
const { log } = require('../../middlewares/logger.middleware')
const router = express.Router()


router.get('/',getTodos)


// router.get('/todos/:id', getTodoById)
router.post('/', addTodo)
// router.put('/todo/complete/:id', updateTodo)
// router.delete('/todo/delete/:id', removeTodo)

// app.get('/todos', async (req, res) => {
//     const todos = await Todo.find()
//     res.json(todos)
// })

// app.post('/todo/new', (req, res) => {
//     const todo = new Todo({
//         text: req.body.text
//     })

//     todo.save()
//     res.json(todo)
// })

// app.delete('/todo/delete/:id', async (req, res) => {
//     try {
//         const result = await Todo.findByIdAndDelete(req.params.id)
//         res.json(result)
//     }
//     catch (e) {
//         console.log(err);
//     }
// })

// app.get('/todo/complete/:id', async (req, res) => {
//     const todo = await Todo.findById(req.params.id)
//     todo.complete = !todo.complete
//     todo.save()
//     res.json(todo)
// })

module.exports = router