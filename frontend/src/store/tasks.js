import { csrfFetch } from './csrf'

const CREATETASK = 'tasks/create_task'
const ALLTASKS = 'tasks/all_tasks'
const EDITTASKS = 'tasks/edit_tasks'
const DELETETASK = 'tasks/delete_task'

export const createTask = (task) => ({
    type: CREATETASK,
    task
})

export const allTheTasks = (tasks) => ({
    type: ALLTASKS,
    tasks
})

export const editTasks = (task) => ({
    type: EDITTASKS,
    task
})

export const deleteTask = (task) => ({
    type: DELETETASK,
    task
})

export const createTaskThunk = (task) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(task)
    })

    if (response.ok) {
        const task = await response.json()
        dispatch(createTask(task))
        return task
    }
}

export const allTasksThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks`)

    if (response.ok) {
        const task = await response.json()
        dispatch(allTheTasks(task))
        return task
    }
}

export const editTaskThunk = (task, taskId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })

    if (response.ok) {
        const task = await response.json()
        dispatch(editTasks(task))
        return task
    }
}

export const deleteTaskButtonThunk = (task) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${task}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const task = await response.json()
        dispatch(deleteTask(task))
        return task
    }
}

const initialState = {
    allTasks: {}
}

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ALLTASKS: {
            const allOfTheTasks = {}
            action.tasks.forEach((task) => {
                allOfTheTasks[task.id] = task
            })
            return { ...state, allTasks: allOfTheTasks }
        }
        case CREATETASK:
            return { ...state, allTasks: { ...state.allTasks, [action.task.id]: action.task } }
        case EDITTASKS: {
            return { ...state, allTasks: { ...state.allTasks, [action.task.id]: action.task } }
        }
        case DELETETASK:
            const updatedTasks = { ...state.allTasks };
            delete updatedTasks[action.task];

            return {
                ...state,
                allTasks: updatedTasks,
            };
        default:
            return state
    }
}