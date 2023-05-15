import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllNotesThunk } from "../../store/notebooks";
import './index.css'

const AllNotes = () => {
    const dispatch = useDispatch();
    const { noteId } = useParams();
    const notesThunk = useSelector((state) => state.notebooks.notes)
    const notes = Object.values(notesThunk)

    useEffect(() => {
        dispatch(getAllNotesThunk(noteId))
    }, [dispatch])

    return (
        <div className="main-spot-Container">
            <h2>Notes</h2>
            {notes.map((note) => (
                <div>
                    {note.title}
                </div>
            ))}

        </div>
    )
}

export default AllNotes;