import { useState, useEffect, useRef } from 'react'
import { TodoAdd } from './cmps/TodoAdd'
import { TodoEdit } from './cmps/TodoEdit'
import { TodoFilter } from './cmps/TodoFilter'
import { todoService } from './services/todo.service'
import { ReactComponent as Edit } from './assets/img/iconmonstr-pencil-14.svg';
import { ReactComponent as Trashcan } from './assets/img/iconmonstr-trash-can-2.svg';
import { Footer } from './cmps/Footer'


function App() {

  const [todos, setTodos] = useState([])
  const [editPos, setEditPos] = useState('')
  const [currTodo, setCurrTodo] = useState('')
  const [popover, setPopover] = useState(false)
  const [editTodoMargin, setEditTodoMargin] = useState(0)
  const todoEl = useRef(null);

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async (filterBy) => {
    const todos = await todoService.query(filterBy)
    setTodos(todos)
  }

  const onChangeFilter = async (filterBy) => {
    await getTodos(filterBy)
  };


  const completeTodo = async (ev, todo) => {
    todo.complete = !todo.complete
    await todoService.save(todo)
    setTodos([...todos]);
  }


  const removeTodo = async (ev, id) => {
    ev.stopPropagation()
    const data = await todoService.remove(id)
    setTodos(todos => todos.filter(todo => todo._id !== data._id))
    setEditTodoMargin(0)
  }

  const addTodo = async (todo) => {
    const newTodo = await todoService.save(todo)
    setTodos([...todos, newTodo])
  }

  const editTodo = async (todo, popover) => {
    await todoService.save(todo)
    setTodos([...todos])
    closePopover(popover)
  }

  const popoverEdit = async (ev, todo) => {
    ev.stopPropagation()
    setCurrTodo(todo)
    const elPos = await ev.target.getBoundingClientRect()
    checkScrollHeight()
    setPopover(true)
    setEditPos(elPos)
  }

  const closePopover = async (popover) => {
    setPopover(popover)
  }

  const checkScrollHeight = () => {
    if (todoEl.current.scrollHeight > 650) {
      setEditTodoMargin(8)
    }
  }



  return (
    <div className="app-general">
      <div className="logo">
        <h1>Toodlidoo</h1>
      </div>
      <div className="title">
        <TodoFilter onChangeFilter={onChangeFilter} />
        <TodoAdd addTodo={addTodo} />
      </div>
      <div className="todos scroller" ref={todoEl} >
        {todos.map(todo => (
          <div
            className={'todo   ' + (todo.complete ? 'completed' : '')}
            key={todo._id}
            onClick={(ev) => completeTodo(ev, todo)}

          >
            <div className='checkbox'></div>
            <div className='text'>{todo.text}</div>
            <div className='edit-tools'>
              <div className='edit-todo'
                onClick={(ev) => popoverEdit(ev, todo)}><Edit className='svg' /></div>
              <div className='delete-todo'
                onClick={(ev) => removeTodo(ev, todo._id)}><Trashcan className='svg' /></div>
            </div>
          </div>
        ))}
      </div>
      {popover &&
        <TodoEdit
          editTodo={editTodo}
          closePopover={closePopover}
          editPos={editPos}
          currTodo={currTodo}
          popover={popover}
          editTodoMargin={editTodoMargin}
        />}
      <Footer />
    </div>

  );
}

export default App;
