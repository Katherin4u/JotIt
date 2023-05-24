import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllNotebookThunk } from "../../store/notebooks";
import './index.css'

const AllNotebooks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const notebookThunk = useSelector((state) => state.notebooks.allNotebooks)
    const notebooks = Object.values(notebookThunk)

    useEffect(() => {
        dispatch(getAllNotebookThunk())
    }, [dispatch])

    // hangle notebooks being clicked
    const handleNotebookClick = (notebookId) => {
        history.push(`/notebook/${notebookId}`);
    };

    return (
        <div className="main-spot-Container">
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