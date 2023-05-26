import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllNotebookThunk } from "../../store/notebooks";
import AllNotes from "../Notes"
import './index.css'

const AllNotebooks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebookThunk = useSelector((state) => state.notebooks.allNotebooks)
    const notebooks = Object.values(notebookThunk)
    // Add a state variable for triggering re-render
    const [triggerRerender, setTriggerRerender] = useState(false);

    useEffect(() => {
        dispatch(getAllNotebookThunk())
    }, [dispatch, triggerRerender])

    // hangle notebooks being clicked
    const handleNotebookClick = (notebookId) => {
        history.push(`/notebook/${notebookId}`);
    };

    const handleRerender = () => {
        // Update the state variable to trigger re-render
        setTriggerRerender(prevState => !prevState);
    };

    return (
        <div className="main-spot-Container">
            <button onClick={handleRerender}></button>
            {notebooks.map((notebook) => (
                <div>
                    <div key={notebook.id} onClick={() => handleNotebookClick(notebook.id)}>
                        {notebook.title}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllNotebooks;