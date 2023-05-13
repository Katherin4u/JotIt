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

    return (
        <div className="main-spot-Container">
            <h2>Notebooks</h2>
            {notebooks.map((notebook) => (
                <div>
                    {notebook.title}
                </div>
            ))}

        </div>
    )
}

export default AllNotebooks;