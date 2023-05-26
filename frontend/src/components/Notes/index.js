import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllNotesThunk } from "../../store/notebooks";
import './index.css'

const AllNotes = () => {
    const dispatch = useDispatch();
    const { noteId } = useParams();
    const history = useHistory();
    const notesThunk = useSelector((state) => state.notebooks.notes)
    const notes = Object.values(notesThunk)

    useEffect(() => {
        dispatch(getAllNotesThunk(noteId))
    }, [dispatch, noteId])

    const handleNoteClick = (noteId) => {
        history.push(`/note/${noteId}`);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", marginLeft: '10rem' }}>
            <div className="container-note2" >
                {notes.map((note) => (
                    <button key={note.id} onClick={() => handleNoteClick(note.id)} className="container-title-text-note buttonToLooseProperties">
                        <div className="container-note">
                            <div className="note-title">{note.title}</div>
                            <div className="note-subtitle">{note.subtitle}</div>
                        </div>
                    </button>
                ))}

            </div>
        </div>
    )
}

export default AllNotes;