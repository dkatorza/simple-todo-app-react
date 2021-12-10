import { useState} from 'react'
import { todoService } from '../services/todo.service'

export const TodoAdd = ({addTodo}) => {
  const [newTodo, setNewTodo] = useState('')

  const onAddTodo = async() => {
    if (!newTodo) return
    const todo = {
      text:newTodo
    }
    await addTodo(todo)
    setNewTodo('')
  }

  return (
    <div className='todo-add-wrapper'>
      <div className='todo-add-input'>
        <input 
        type="text" 
        placeholder='Doing something?'
        onChange={(ev)=> setNewTodo(ev.target.value)} 
        value={newTodo}
        />
      </div>
      <div className='todo-add-btn' onClick={onAddTodo}>+</div>
    </div>
  );
}