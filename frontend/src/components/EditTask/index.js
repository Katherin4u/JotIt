import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { editTaskThunk } from "../../store/tasks"


const EditTask = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const task = useSelector((state) => state.tasks.allTasks)
    const tasks = Object.values(task)
    const [title, setTitle] = useState(tasks.title)
    const [text, setText] = useState(tasks.text)
    const [priority, setPriority] = useState(tasks.priority)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const editTask = {
            ...tasks,
            title,
            text,
            priority
        }

        dispatch(editTaskThunk(editTask, tasks.id)).then(() => {
            history.push('/tasks')
        })

    }
    return (
        <div>

        </div>
    )
}