import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTaskThunk } from "../../store/tasks"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form';

const CreateTasks = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [priority, setPriority] = useState('')

    const submit = async (e) => {
        e.preventDefault();

        const task = {
            title,
            text,
            priority
        }
        await dispatch(createTaskThunk(task))
    }

    const closemodal = (e) => {
        e.preventDefault();
        history.push('/tasks')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row" }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>

                    <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>

                    <input
                        type="text"
                        value={text}
                        placeholder="New task here"
                        onChange={(e) => setText(e.target.value)}
                    />

                </label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value={priority}>Low</option>
                    <option value={priority}>Medium</option>
                    <option value={priority}>High</option>
                </Form.Select>
                <button type='submit' onClick={(e) => closemodal(e)}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateTasks