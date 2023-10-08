import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Auth} from "aws-amplify"
import TaskPreview from "../../components/task-preview/task-preview.component"
import ViewTaskInfo from "../../components/view-task-info/view-task-info.component"
import { ListContainer } from "./list.styles"
const List = () => {
    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasksFromList, setTasksFromList] = useState([]);
    const [toggleCreateList, setToggleCreateList] = useState(false); 

    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;


    useEffect(() => {
        const fetchTasksFromList = async () => {
            try {
                setLoading(true);
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
            }
            catch(error){
                setError(error);
            }finally {
                setLoading(false);
            }
        }
        fetchTasksFromList()
    }, [])

    const handleAddTask = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`; 
            const response = await fetch(createTodoEndpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                },
                body: JSON.stringify({
                    title: "Task 3 Testing",
                    
                })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of fetching tasks from a list!");
            console.log(result);
        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }



    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return <div>Error: {error.message ? error.message : JSON.stringify(error)}</div>
    }
    return (
        <ListContainer>
        <div class="column">
            <h2>To do</h2>
            <TaskPreview/>
            <button>+ Add task</button>
        </div>
        <div class="column">
            <h2>Doing</h2>
            
            <TaskPreview/>
            <TaskPreview/>

            <button onClick={handleAddTask}>+ Add task</button>
        </div>
        <div class="column">
            <h2>Done</h2>
            <TaskPreview/>
            <button>+ Add task</button>
        </div>
        {/* <ViewTaskInfo/> */}
    </ListContainer>


    )
}

export default List; 