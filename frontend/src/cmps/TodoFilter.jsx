import { useForm } from '../hooks/useForm'


export const TodoFilter = ({ onChangeFilter }) => {

    const [filterBy, handleChange] = useForm({
        title: ''
    }, onChangeFilter)

    const { title } = filterBy
    return (
        <div className='todo-filter-wrapper'>
                <div className='todo-filter-input'>
                    <input
                        type="text"
                        placeholder='Search'
                        onChange={handleChange}
                        value={title}
                        name='title'
                    />
                </div>
            <div className='select'>+</div>
        </div>
    );
}