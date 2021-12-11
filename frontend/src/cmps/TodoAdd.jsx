import { useState} from 'react'
import { todoService } from '../services/todo.service'

export const TodoAdd = ({addTodo}) => {
  const [newTodo, setNewTodo] = useState('')
  const [placeholder,setPlaceholder] = useState('Doing something?')

  const onAddTodo = async() => {
    if (!newTodo) {
      setPlaceholder(`You must have something to do... `)
      return
    } 
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
        placeholder={placeholder}
        onChange={(ev)=> setNewTodo(ev.target.value)} 
        value={newTodo}
        />
      </div>
      <div className='button' onClick={onAddTodo}>+</div>
    </div>
  );
}