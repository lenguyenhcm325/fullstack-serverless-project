import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { CreateTaskContainer } from "./create-task.styles";
import {Auth} from "aws-amplify"
const CreateTask = ({setToggleCreateTask}) => {
    const {listId} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [taskInfo, setTaskInfo] = useState({
        title: "",
        description: "",
    })

    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;

    const handleCreateTask = async () => {
        try {
            setLoading(true);
            const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`;
            const response = await fetch(createTodoEndpoint, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                },
                body: JSON.stringify(
                    {
                        title: taskInfo.title,
                        description: taskInfo.description
                    })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of creating task list");
            console.log(result);

        }
        catch(error){
            console.log(error)
            setError(error);
        }finally {
            setLoading(false);
        }        


    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setTaskInfo({... taskInfo, [name]: value})
    }

    console.log(taskInfo);
    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Form got submitted with " + taskInfo.title);
        handleCreateTask()
        console.log("after the handleCreateTask")
        setToggleCreateTask(false);
    
    }

    const handleClose = () => {
        setToggleCreateTask(false);
    }

    return (
        <CreateTaskContainer>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input value={taskInfo.title} onChange={handleInputChange} type="text" id="title" name="title" required/>
                {/* <label htmlFor="dueTime">Due Date Time</label>
                <input type="datetime-local" id="dueTime" name="dueTime" value=""/>
                <input value={taskInfo.title} onChange={handleInputChange} type="text" id="dueTime" name="dueTime" required/> */}
                <label htmlFor="description">Description</label>
                <input value={taskInfo.description} onChange={handleInputChange} type="text" id="description" name="description"/>
                <button type="submit" >Submit</button>
            </form>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </CreateTaskContainer>
    )


}

export default CreateTask;