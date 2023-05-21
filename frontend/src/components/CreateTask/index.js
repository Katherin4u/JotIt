import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTaskThunk } from "../../store/tasks"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import Form from 'react-bootstrap/Form';

const CreateTasks = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [priority, setPriority] = useState('')
    const { closeModal } = useModal(); // Access closeModal function from the ModalContext

    const submit = async (e) => {
        e.preventDefault();

        const task = {
            title,
            text,
            priority
        }
        dispatch(createTaskThunk(task)).then(() => {
            closeModal(); 
            history.push("/tasks");
        });
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
                <Form.Select aria-label="Default select example" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value='Low' >Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </Form.Select>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateTasks