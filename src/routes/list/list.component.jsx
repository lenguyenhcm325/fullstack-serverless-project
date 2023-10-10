import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Auth} from "aws-amplify"
import CreateTask from "../../components/create-task/create-task.component"
import TaskPreview from "../../components/task-preview/task-preview.component"
import { ListContainer } from "./list.styles"
const List = () => {

    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [allTasks, setAllTasks] = useState([]);
    
    const [toggleCreateTask, setToggleCreateTask] = useState(false); 


    // const [todoTasks, setTodoTasks] = useState([]);
    // const [doingTasks, setDoingTasks] = useState([]);
    // const [doneTasks, setDoneTasks] = useState();

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
        fetchTasksFromList()
    }, [])

    // const handleAddTask = async (event) => {
    //     event.preventDefault();
    //     try {
    //         setLoading(true);
    //         const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`; 
    //         const response = await fetch(createTodoEndpoint, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    //             },
    //             body: JSON.stringify({
    //                 title: "Task 3 Testing",
                    
    //             })
    //         })
    //         if (!response.ok){
    //             throw new Error('Something went wrong!');
    //         }
    //         const result = await response.json();
    //         console.log("this is the result of fetching tasks from a list!");
    //         console.log(result);
    //     }
    //     catch(error){
    //         setError(error);
    //     }finally {
    //         setLoading(false);
    //     }
    // }



    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return <div>Error: {error.message ? error.message : JSON.stringify(error)}</div>
    }
    if (allTasks.length > 0){
        return (
            <ListContainer>
            <div className="column">
                <h2>To do</h2>
                {
                    allTasks.filter(task => task.status === "todo").map(task => (
                        <TaskPreview key={task.taskId} {...task}/>
                    ))
                }
                <button className="toggle-create-task" onClick={() => setToggleCreateTask(true)}>+ Add task</button>
            </div>
            <div className="column">
                <h2>Doing</h2>
                {
                    allTasks.filter(task => task.status === "doing").map(task => (
                        <TaskPreview key={task.taskId} {...task}/>
                    ))
                }

                <button className="toggle-create-task" onClick={() => setToggleCreateTask(true)}>+ Add task</button>
            </div>
            <div className="column">
                <h2>Done</h2>
                {
                    allTasks.filter(task => task.status === "done").map(task => (
                        <TaskPreview key={task.taskId} {...task}/>
                    ))
                }
                <button className="toggle-create-task" onClick={() => setToggleCreateTask(true)}>+ Add task</button>
            </div>
            {
                toggleCreateTask && (<CreateTask setToggleCreateTask={setToggleCreateTask}/>)
            }
        </ListContainer>


        )
    }
}

export default List; 