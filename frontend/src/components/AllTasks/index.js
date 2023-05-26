import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTasksThunk, deleteTaskButtonThunk } from "../../store/tasks";
import EditTask from "../EditTask";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './AllTask.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const AllTasks = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const stateTasks = useSelector((state) => state.tasks.allTasks)
    const tasks = Object.values(stateTasks)
    const [deletedTaskId, setDeletedTaskId] = useState('')

    useEffect(() => {
        dispatch(allTasksThunk());
      }, [dispatch, deletedTaskId]);

      const deleteButton = async (e, taskId) => {
        e.preventDefault();
        await dispatch(deleteTaskButtonThunk(taskId));
        setDeletedTaskId(taskId);
      };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", marginLeft: '10rem' }}>
            <div className="container-task2" >
                {tasks.map((task) => {
                    if (task.id === deletedTaskId) {
                        return null;
                    }
                    return (
                        <div className="container-title-text-task" key={task.id}>
                            <div className="container-task">
                                <button onClick={(e) => deleteButton(e, task.id)} >Delete</button>
                                <OpenModalMenuItem
                                    itemText="Edit"
                                    modalComponent={<EditTask taskId={task.id} props={task} />}
                                />
                                <div style={{ paddingBottom: "10px" }}>{task.title}</div>
                                <div style={{ paddingBottom: "10px" }}>{task.priority}</div>
                                <div>{task.text}</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default AllTasks