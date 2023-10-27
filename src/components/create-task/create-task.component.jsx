import React, { useState} from "react"
import { useParams } from "react-router-dom";
import { CreateTaskContainer } from "./create-task.styles";
import { useSelector } from "react-redux";
import { selectJwtToken } from "../../store/user/user.selector";
const CreateTask = ({setToggleCreateTask, status, fetchTasksFromList}) => {
    const jwtToken = useSelector(selectJwtToken)
    const {listId} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [taskInfo, setTaskInfo] = useState({
        title: "",
        note: "",
    })

    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;

    const handleCreateTask = async () => {
        try {
            setLoading(true);
            const createTodoEndpoint = `${apiEndpoint}/tasks/123`;
            const response = await fetch(createTodoEndpoint, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify(
                    {
                        listId: listId,
                        title: taskInfo.title,
                        note: taskInfo.note,
                        status: status
                    })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();

        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }        


    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setTaskInfo({... taskInfo, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        await handleCreateTask()
        setToggleCreateTask(false);
        fetchTasksFromList()

    }
    const handleClose = () => {
        setToggleCreateTask(false);
    }

    return (
        <CreateTaskContainer>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input value={taskInfo.title} onChange={handleInputChange} type="text" id="title" name="title" required/>
                <label htmlFor="note">Note</label>
                <input value={taskInfo.note} onChange={handleInputChange} type="text" id="note" name="note"/>
                <button type="submit">Submit</button>
            </form>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </CreateTaskContainer>
    )
}

export default CreateTask;