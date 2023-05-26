import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTagsThunk } from "../../store/tags"


const AllTags = () => {
    const dispatch = useDispatch()
    const stateTags = useSelector((state) => state.tags.allTags)
    const tags = Object.values(stateTags)

    useEffect(() => {
        dispatch(allTagsThunk())
    }, [dispatch])

    return(
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", marginLeft: '10rem' }}>
            <div>
                {tags.map((tag) => {
                    <div>
                        <div>{tag.name}</div>
                        <div>{tag.color}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AllTags