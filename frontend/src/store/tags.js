import { csrfFetch } from './csrf'

const ALLTAGS = 'tags/all_tags'
const TAGSTASK = 'tags/all_tags_tasks'

export const allTheTags = (tags) => ({
    type: ALLTAGS,
    tags
})

export const tagsForTask = (tags) => ({
    type: TAGSTASK,
    tags
})

// all tags 
export const allTagsThunk = () => async (dispatch) => {
    const response =  await csrfFetch('api/tags')

    if(response.ok){
        const tag = await response.json()
        dispatch(allTheTags(tag))
        return tag
    }
}

// gets all tags from a task
export const allTagsFromTask = (taskId) => async (dispatch) => {
    const response =  await csrfFetch(`api/tagtasks/${taskId}`)
    if(response.ok){
        const tag = await response.json()
        dispatch(tagsForTask(tag))
        return tag
    }
}

const initialState = {}


export default function tagReducer(state= initialState, action) {
    switch(action.type){
        case ALLTAGS: {
            const allOfTheTags = {}
            action.tags.forEach((tag) => {
                allOfTheTags[tag.id] = tag
            })
            return { ...state, allTags: allOfTheTags }
        }
        case TAGSTASK: {
            const allOfTheTags = {}
            console.log(action)
            action.tags.forEach((tag) => {
                allOfTheTags[tag.id] = tag
            })
            return { ...state, allTags: allOfTheTags }
        }
        default:
            return state
    }
}