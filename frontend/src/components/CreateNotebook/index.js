import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNotebookThunk } from "../../store/notebooks"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import Form from 'react-bootstrap/Form';

const CreateNotebook = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const { closeModal } = useModal(); // Access closeModal function from the ModalContext

    const submit = async (e) => {
        e.preventDefault();

        const notebook = {
            title,
        }
        dispatch(createNotebookThunk(notebook)).then(() => {
            closeModal();
            history.push("/notebooks");
        });
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row" }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>

                    <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateNotebook