import { useState, useEffect } from 'react'

const API_BASE = 'Http://localhost:3030'

function App() {

  const [todos, setTodos] = useState([])
  const [popupActive, setpopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    getTodos()
    console.log(todos);
  }, [])

  const getTodos = () => {
    fetch(API_BASE + '/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log('err', err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + `/todo/complete/${id}`)
      .then(res => res.json())

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete
      }
      return todo
    }))
  }

  const deleteTodo = async (ev, id) => {
    ev.stopPropagation()
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE"

    }).then(res => res.json())
      .catch(err => console.log('err', err))
    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }


  return (
    <div className="app-general">
      <div className="logo">
        <h1>Toodlidoo</h1>
      </div>
      <div className="title">
        <h4>Your Tasks</h4>
      </div>

      <div className="todos">
        {todos.map(todo => (
          <div
            className={'todo ' + (todo.complete ? 'completed' : '')}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}>
            <div className='checkbox'></div>
            <div className='text'>{todo.text}</div>
            <div className='delete-todo' onClick={(ev) => deleteTodo(ev, todo._id)}>x</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
