import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { editTaskThunk } from "../../store/tasks"
import { useModal } from "../../context/Modal"
import Form from 'react-bootstrap/Form';



const EditTask = ({ taskId, props }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const task = useSelector((state) => state.tasks.allTasks)
    const tasks = Object.values(task)
    const [title, setTitle] = useState(props.title)
    const [text, setText] = useState(props.text)
    const [priority, setPriority] = useState(props.priority)
    const { closeModal } = useModal(); // Access closeModal function from the ModalContext


    const handleSubmit = async (e) => {
        e.preventDefault()

        const editTask = {
            ...tasks,
            title,
            text,
            priority
        }

        dispatch(editTaskThunk(editTask, taskId)).then(() => {
            closeModal();
            history.push('/tasks')
        })

    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", height: "13rem", width: "23rem", justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="text-container-form">
                    <input
                        className="input-text-form"
                        type="text"
                        value={title}

                        onChange={(e) => setTitle(e.target.value)}>
                    </input>
                </label>
                <label className="text-container-form">

                    <input
                        className="input-text-form"

                        type="text"
                        value={text}

                        onChange={(e) => setText(e.target.value)}
                    />

                </label>
                <Form.Select aria-label="Default select example" value={priority} onChange={(e) => setPriority(e.target.value)} >
                    <option>Open this select menu</option>
                    <option value='Low' >Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </Form.Select>
                <div className="task-create-submit-button">
                    <button type='submit' style={{ width: "180px" }}>
                        Submit
                    </button>

                </div>
            </form>
        </div>
    )
}

export default EditTask