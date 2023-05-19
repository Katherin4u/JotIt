import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTasksThunk } from "../../store/tasks";
import './AllTask.css'


const AllTasks = () => {
    const dispatch = useDispatch();
    const stateTasks = useSelector((state) => state.tasks.allTasks)
    const tasks = Object.values(stateTasks)

    useEffect(() => {
        dispatch(allTasksThunk())
    }, [dispatch])
    //just checking the branch

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", marginLeft: '2rem'}}>
            {tasks.map((task) => (
                <div>
                    <div className="container-task">
                        <div>{task.title}</div>
                        <div>{task.priority}</div>
                        <div>{task.text}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllTasks