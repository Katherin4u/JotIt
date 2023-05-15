import { csrfFetch } from './csrf'

const GET_ALL_NOTEBOOKS = 'notebooks/get_all_notebooks'
const GET_NOTES = 'notebooks/get_notes'

// short functions
export const getAllNotebooks = (notebooks) => ({
    type: GET_ALL_NOTEBOOKS,
    notebooks
})

export const getAllNotes = (note) => ({
    type: GET_NOTES,
    note
})

/**
 * Thunks
 */

// get all notebooks
export const getAllNotebookThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks`)

    // response
    const notebooks = await res.json();
    if (res.ok) {
        dispatch(getAllNotebooks(notebooks))
        return notebooks
    }
}

// get all notes in notebook
export const getAllNotesThunk = (notebookId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks/${notebookId}/notes`)

    // response
    const notes = await res.json();
    if (res.ok) {
        dispatch(getAllNotes(notes))
        return notes
    }
}

// initial state
const initialState = {
    allNotebooks: {},
    notebook: {},
    notes: {}
}

// reducer
export default function notebookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTEBOOKS: {
            const allTheNotebooks = {}
            action.notebooks.forEach((notebook) => {
                allTheNotebooks[notebook.id] = notebook
            })
            return { ...state, allNotebooks: allTheNotebooks }
        }
        case GET_NOTES: {
            const allTheNotes = {}
            action.note.forEach((note) => {
                allTheNotes[note.id] = note
            })
            return { ...state, notes: allTheNotes }
        }
        default:
            return state;
    }
}