import { useState, useEffect } from 'react'
import { TodoAdd } from './cmps/TodoAdd'
import { todoService } from './services/todo.service'

function App() {

  const [todos, setTodos] = useState([])
  const [popupActive, setpopupActive] = useState(false)

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    const todos = await todoService.query()
    setTodos(todos)
  }

  const completeTodo = async (todo) => {
    todo.complete = !todo.complete
    const updatedTodo =  await todoService.save(todo)
    // setTodos([...todos, {todo:updatedTodo}])
    getTodos()
  }

  const removeTodo = async (ev, id) => {
    ev.stopPropagation()
    const data = await todoService.remove(id)
    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }

  const addTodo = async (todo) => {
    const newTodo = await todoService.save(todo)
    setTodos([...todos, newTodo])
  }

  return (
    <div className="app-general">
      <div className="logo">
        <h1>Toodlidoo</h1>
      </div>
      <div className="title">
        <TodoAdd addTodo={addTodo} />
      </div>

      <div className="todos">
        {todos.map(todo => (
          <div
            className={'todo ' + (todo.complete ? 'completed' : '')}
            key={todo._id}
            onClick={() => completeTodo(todo)}
          >
            <div className='checkbox'></div>
            <div className='text'>{todo.text}</div>
            <div className='delete-todo' onClick={(ev) => removeTodo(ev, todo._id)}>x</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
