import React, {useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import {Auth} from "aws-amplify"
import { ViewTaskInfoContainer } from "./view-task-info.styles";
import LoadingSpinner from "../loading-spinner/loading-spinner.component";
const ViewTaskInfo = ({
    setToggleEditTask,
    note,
    taskId

    }) => {
        const timeout = useRef(null);
        const noteRef = useRef()
    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [updatingToBackend, setUpdatingToBackend] = useState(false);
    const [taskInfo, setTaskInfo] = useState(
        {
            note: note? note : ""
        }
    )
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const updateTaskInfoBackend = async (note) => {
        try {

            setUpdatingToBackend(true)
            console.log({
                note: note,
                taskId: taskId

            })
            const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`;
            const response = await fetch(createTodoEndpoint, {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                },
                method: "PUT",
                body: JSON.stringify({
                    note: note,
                    taskId: taskId

                })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of updating the attribute from a task");
            console.log(result);
            console.log("this is the result of updating the attribute from a task! ABOVE");
        }
        catch(error){
            console.error(error);
        }finally {
            console.log("finished")
            setUpdatingToBackend(false)
        }
    }
    const handleUpdateBeforeUnload = (event) => {
        event.preventDefault()
        const currentNote = noteRef.current;
        console.log("this is the thing  " + currentNote)
        console.log("this is the thing  " + currentNote)
        console.log("this is the thing  " + currentNote)
        console.log("this is the thing  " + currentNote)
        console.log("this is the thing  " + currentNote)
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
        console.log(taskInfo)
        const newNote = event.target.value;
        setTaskInfo({
            ...taskInfo, note: newNote
        })
        noteRef.current = newNote;
        if (timeout.current){
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
                console.log("This gets run, hopefully after 2 seconds")
                updateTaskInfoBackend(newNote)
            }, 1000)
    }

    const handleClose = () => {
        console.log("it should be false!!!!!!!")
        setToggleEditTask(false)
    }

    return(
        <ViewTaskInfoContainer>
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
                <button className="delete-button">Delete</button>

            </div>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
            {
                updatingToBackend && (<LoadingSpinner/>)
            }
        </ViewTaskInfoContainer>

    )
}


export default ViewTaskInfo;