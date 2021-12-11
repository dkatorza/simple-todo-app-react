import { useState, useEffect } from 'react'

export const TodoEdit = ({ editTodo, editPos, currTodo, popover, closePopover }) => {

    const [todoTitle, setTodoTitle] = useState('')
    const [placeholder, setPlaceholder] = useState('')

    useEffect(() => {
        setTodoTitle(currTodo.text)
    }, [currTodo])

    const dismissChanges = () => {
        popover = !popover
        closePopover(popover)
    }

    const onEditTodo = async () => {
        if (!todoTitle) {
            setPlaceholder(`You must have something to do... `)
            return
        } else {
            currTodo.text = await todoTitle
            popover = !popover
            editTodo(currTodo, popover)
            setTodoTitle('')
        }

    }

    return (
        <>
            <div className='edit-todo-wrapper'
                style={{
                    top: editPos.top - 20 + 'px',
                    left: '388px',
                }}>
                <div className='edit-todo-input'>
                    <input type="text"
                        placeholder={placeholder}
                        onChange={(ev) => setTodoTitle(ev.target.value)}
                        defaultValue={todoTitle && todoTitle}
                    />
                </div>
                <div className='edit-todo-save' onClick={onEditTodo}>+</div>
                <div className='edit-todo-omit' onClick={dismissChanges}>-</div>
            </div>
        </>
    );
}