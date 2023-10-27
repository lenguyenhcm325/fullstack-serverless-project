import React, {useState, useEffect, useRef} from "react"
import { useParams } from "react-router-dom"
import CreateTask from "../../components/create-task/create-task.component"
import TaskPreview from "../../components/task-preview/task-preview.component"
import AddCollaboratorButton from "../../components/add-collaborator-button/add-collaborator-button.component"
import AddCollaborator from "../../components/add-collaborator/add-collaborator.component"
import CollaboratorList from "../../components/collaborator-list/collaborator-list.component"
import { ListContainer } from "./list.styles"
import { useSelector } from "react-redux"
import { selectJwtToken } from "../../store/user/user.selector"
import BigErrorMessage from "../../components/big-error-message/big-error-message.component"
const List = () => {
    const jwtToken = useSelector(selectJwtToken)
    const {listId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [taskStatus, setTaskStatus] = useState(null);
    const [allTasks, setAllTasks] = useState([]);
    const [toggleAddCollaborator, setToggleAddCollaborator] = useState(false);
    const [toggleCreateTask, setToggleCreateTask] = useState(false); 
    const [usersWithRole, setUsersWithRole] = useState([]);

    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const fetchTasksFromList = async () => {
        try {
            const createTodoEndpoint = `${apiEndpoint}/lists/${listId}`;
            const response = await fetch(createTodoEndpoint, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            setAllTasks(result)
        }
        catch(err){
            setError(err);
        }
    }
    const fetchUsersWithRole = async() => {
        try {
            const collaboratorsEndpoint = `${apiEndpoint}/collaborators?listId=${listId}`;
            const response = await fetch(collaboratorsEndpoint, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }                    
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }            
            const result = await response.json();
            setUsersWithRole(result)
        }catch(err) {
            setError(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchTasksFromList()
        fetchUsersWithRole()
        setLoading(false);
    }, [])

    const handleClick = (status) => {
        setToggleCreateTask(true)
        setTaskStatus(status)
    }

    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return (
            <BigErrorMessage/>
        )
    }

        return (
            <ListContainer>
            <div className="column">
                <h2>To do</h2>
                {
                    allTasks.filter(task => task.status === "todo").map(task => (
                        <TaskPreview key={task.taskId} {...task} fetchTasksFromList={fetchTasksFromList}/>
                    ))
                }
                <button className="toggle-create-task" onClick={() => handleClick("todo")}>+ Add task</button>
            </div>
            <div className="column">
                <h2>Doing</h2>
                {
                    allTasks.filter(task => task.status === "doing").map(task => (
                        <TaskPreview key={task.taskId} {...task} fetchTasksFromList={fetchTasksFromList}/>
                    ))
                }

                <button className="toggle-create-task" onClick={() => handleClick("doing")}>+ Add task</button>
            </div>
            <div className="column">
                <h2>Done</h2>
                {
                    allTasks.filter(task => task.status === "done").map(task => (
                        <TaskPreview key={task.taskId} {...task} fetchTasksFromList={fetchTasksFromList}/>
                    ))
                }
                <button className="toggle-create-task" onClick={() => handleClick("done")}>+ Add task</button>
            </div>
            {
                toggleCreateTask && (<CreateTask fetchTasksFromList={fetchTasksFromList} setToggleCreateTask={setToggleCreateTask} status={taskStatus}/>)
            }
            
            {
                toggleAddCollaborator && (
                    <AddCollaborator fetchUsersWithRole={fetchUsersWithRole} setToggleAddCollaborator={setToggleAddCollaborator}/>
                )
            }
            <div className="collaborators-section">
                <AddCollaboratorButton setToggleAddCollaborator={setToggleAddCollaborator}/>
                <CollaboratorList usersWithRole={usersWithRole}/>
            </div>
        </ListContainer>
        )
}

export default List; 