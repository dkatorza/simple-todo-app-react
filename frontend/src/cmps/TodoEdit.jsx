import { useState, useEffect, useRef } from 'react'
import { ReactComponent as CheckMark } from '../assets/img/iconmonstr-check-mark-1.svg';
import { ReactComponent as Xmark } from '../assets/img/iconmonstr-x-mark-1.svg';

export const TodoEdit = ({ editTodo, editPos, currTodo, popover, closePopover }) => {

    const [todoTitle, setTodoTitle] = useState('')
    const inputEl = useRef(null);

    useEffect(() => {
        setTodoTitle(currTodo.text)
        inputEl.current.focus();
    }, [currTodo])

    const dismissChanges = () => {
        popover = !popover
        closePopover(popover)
    }

    const onEditTodo = async () => {
        if (!todoTitle) {
            return
        }
        currTodo.text = await todoTitle
        popover = !popover
        editTodo(currTodo, popover)
        setTodoTitle('')


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
                        onChange={(ev) => setTodoTitle(ev.target.value)}
                        defaultValue={todoTitle}
                        ref={inputEl}
                        onBlur={onEditTodo}
                    />
                </div>
                <div className='button' onClick={onEditTodo}><CheckMark className='svg' /></div>
                <div className='button' onClick={dismissChanges}><Xmark className='svg' /></div>
            </div>
        </>
    );
}