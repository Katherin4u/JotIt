import { csrfFetch } from './csrf'

const CREATETASK = 'tasks/create_task'
const ALLTASKS = 'allTasks/all_tasks'

export const createTask = (task) => ({
    type: CREATETASK,
    task    
})

export const allTheTasks = (tasks) => ({
    type: ALLTASKS,
    tasks
}) 

export const createTaskThunk = (task) => async(dispatch) => {
    const response = await csrfFetch(`/api/tasks/`, {
        method: 'POST'
    })
}

export const allTasksThunk =() => async(dispatch) => {
    const response = await csrfFetch( `/api/tasks`)
    
    if(response.ok){
        const task = await response.json()
        console.log(task)
        dispatch(allTheTasks(task))
        return task
    }
}

const initialState = {
    allTasks: {}
}

export default function taskReducer(state = initialState, action) {
    switch(action.type){
        case CREATETASK: 
        return {
            ...state,
            [action.task.id]: action.task
        };
        case ALLTASKS: {
            const allOfTheTasks = {}
            action.tasks.forEach((task) => {
                allOfTheTasks[task.id] = task
            })
            return {...state, allTasks: allOfTheTasks}
        }
        default:
            return state
    }
}