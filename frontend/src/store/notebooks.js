import { csrfFetch } from './csrf'

const GET_ALL_NOTEBOOKS = 'notebooks/get_all_notebooks'

// short functions
export const getAllNotebooks = (notebooks) => ({
    type: GET_ALL_NOTEBOOKS,
    notebooks
})

// thunks
export const getAllNotebookThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks`)

    // response
    const notebooks = await res.json();
    if (res.ok) {
        dispatch(getAllNotebooks(notebooks))
        return notebooks
    }
}

// initial state
const initialState = {
    allNotebooks: {},
    notebook: {}
}

// export reducer
export default function notebookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTEBOOKS: {
            const allTheNotebooks = {}
            console.log(action.notebooks)
            action.notebooks.forEach((notebook) => {
                allTheNotebooks[notebook.id] = notebook
            })
            return { ...state, allNotebooks: allTheNotebooks }
        }
        default:
            return state;
    }
}