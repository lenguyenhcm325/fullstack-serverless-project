import React, {useEffect, useState} from "react";
import { ViewTaskInfoContainer } from "./view-task-info.styles";

const ViewTaskInfo = ({
    setToggleEditTask,
    note,

    }) => {
    const [error, setError] = useState(null);
    const [taskInfo, setTaskInfo] = useState(
        {
            note: note? note : ""
        }
    )

    const updateTaskInfo = async () => {
        try {
            const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`;
            const response = await fetch(createTodoEndpoint, {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                }
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of fetching tasks from a list!");
            console.log(result);
            setAllTasks(result)
            console.log("this is the result of fetching tasks from a list! ABOVE");
            // setTodoTasks(result.filter(task => task.status === "todo"))
            // setDoingTasks(result.filter(task => task.status == "doing"))
            // setDoneTasks(result.filter(task => task.status == "done"))
        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }


    const handleClose = () => {
        console.log("it should be false!!!!!!!")
        console.log("it should be false!!!!!!!")

        setToggleEditTask(false)
        // setToggleEditTask(false)
        // setToggleEditTask(false)
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
                <label htmlFor="description" className="label">Description:</label>
                <input type="text" id="description" defaultValue={taskInfo.note} className="description-input" />
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
        </ViewTaskInfoContainer>

    )
}


export default ViewTaskInfo;