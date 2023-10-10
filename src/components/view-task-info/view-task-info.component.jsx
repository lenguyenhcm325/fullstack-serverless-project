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
    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [updatingToBackend, setUpdatingToBackend] = useState(false);
    const [taskInfo, setTaskInfo] = useState(
        {
            note: note? note : ""
        }
    )
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;

    const handleChange = (event) => {
        console.log(taskInfo)
        const newNote = event.target.value;
        setTaskInfo({
            ...taskInfo, note: newNote
        })
        if (timeout.current){
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
                console.log("This gets run, hopefully after 2 seconds")
                updateTaskInfoBackend(newNote)
            }, 2000)
    }

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
                <div className="label-with-icon">
                    <span className="label">Collaborators</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>
                <ul className="collaborators-list">
                    <li>Collaborator 1</li>
                    <li>Collaborator 2</li>
                    <li>Collaborator 3</li>
                </ul>
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