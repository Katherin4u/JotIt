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
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", marginLeft: '10rem' }}>
            <div className="container-task2" >
                {tasks.map((task) => (
                    <div className="container-title-text-task">
                        <div className="container-task">
                            <div style={{paddingBottom: "10px"}}>{task.title}</div>
                            <div style={{paddingBottom: "10px"}}>{task.priority}</div>
                            <div>{task.text}</div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AllTasks