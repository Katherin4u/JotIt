import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTasksThunk } from "../../store/tasks";


const AllTasks = () => {
    const dispatch = useDispatch();
    const stateTasks = useSelector((state) => state.tasks.allTasks)
    const tasks = Object.values(stateTasks)
    // console.log(tasks)

    useEffect(() => {
        dispatch(allTasksThunk())
    }, [dispatch])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row" }}>
            {tasks.map((task) => {
                <div>
                    <div>{task.title}</div>
                </div>
            })}
        </div>
    )
}

export default AllTasks