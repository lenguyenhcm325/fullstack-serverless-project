import React, {useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { ViewTaskInfoContainer } from "./view-task-info.styles";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/user/user.selector";
const ViewTaskInfo = ({
    setToggleEditTask,
    note,
    taskId,
    fetchTasksFromList

    }) => {
        const jwtToken = useSelector(selectJwtToken)
        const timeout = useRef(null);
        const noteRef = useRef()
    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [taskInfo, setTaskInfo] = useState(
        {
            note: note? note : ""
        }
    )
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const updateTaskInfoBackend = async (note) => {
        try {
            const createTodoEndpoint = `${apiEndpoint}/tasks/${taskId}`;
            const response = await fetch(createTodoEndpoint, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                method: "PUT",
                body: JSON.stringify({
                    note: note,
                    listId: listId

                })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
        }
        catch(err){
            setError(err)
        }finally {
        }
    }
    const handleUpdateBeforeUnload = (event) => {
        event.preventDefault()
        const currentNote = noteRef.current;
        updateTaskInfoBackend(currentNote)
        event.returnValue = "You have unsaved changes! Do you really want to leave?"     
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleUpdateBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleUpdateBeforeUnload)
        }
    }, [])

    const handleChange = (event) => {
        const newNote = event.target.value;
        setTaskInfo({
            ...taskInfo, note: newNote
        })
        noteRef.current = newNote;
        if (timeout.current){
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
                updateTaskInfoBackend(newNote)
            }, 1000)
    }

    const handleDelete = async (event) => {
        try {
            const deleteTaskEndpoint = `${apiEndpoint}/tasks/${taskId}?listId=${listId}`;
            const response = await fetch(deleteTaskEndpoint, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                method: "DELETE"
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            setToggleEditTask(false)
            fetchTasksFromList()
            
        }
        catch(err){
            setError(err);
            setToggleEditTask(false)
        }     
    }

    const handleClose = () => {
        setToggleEditTask(false)
    }

    return(
        <ViewTaskInfoContainer>
            {
                error && (
                    <div className="error-message">Something went wrong! <br/> Please try again later.</div>                    
                )
            }
            <div className="field">
                <div className="label-with-icon">
                    <span className="label">Date</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>

                <p className="data">2023-10-12</p>
                
            </div>
            <div className="field">
                <label htmlFor="description" className="label">Note:</label>
                <input type="text" id="description" onChange={handleChange} defaultValue={taskInfo.note} className="description-input" />
            </div>
            <div className="field">
                <button onClick={handleDelete} className="delete-button">Delete</button>

            </div>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </ViewTaskInfoContainer>

    )
}

export default ViewTaskInfo;