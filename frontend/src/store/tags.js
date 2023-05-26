import { csrfFetch } from './csrf'

const ALLTAGS = 'tags/all_tags'

export const allTheTags = (tags) => ({
    type: ALLTAGS,
    tags
})


export const allTagsThunk = () => async (dispatch) => {
    const response =  await csrfFetch('api/tags')

    if(response.ok){
        const tag = await response.json()
        dispatch(allTheTags(tag))
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
        default:
            return state
    }
}