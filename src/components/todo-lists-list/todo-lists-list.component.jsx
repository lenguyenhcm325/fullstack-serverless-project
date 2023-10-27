import React, {useState, useEffect} from "react";
import { TodoListsListContainer } from "./todo-lists-list.styles";
import ListInfo from "../list-info/list-info.component";
import { useSelector } from "react-redux";
import BigErrorMessage from "../big-error-message/big-error-message.component";
import CreateList from "../create-list/create-list.component";
import { selectJwtToken } from "../../store/user/user.selector";
import formatLocalDate from "../../utils/format-local-date";
const TodoListsList = () => {
    const jwtToken = useSelector(selectJwtToken)
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const [todoListsArray, setTodoListsArray] = useState([]);
    const [toggleCreateList, setToggleCreateList] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchTodoListsArray = async() => {
        try {
            const response = await fetch(`${apiEndpoint}/listsMetadata`, 
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result fetch lists metadata");
            console.log(result);
            setTodoListsArray(result);
        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {

            // fetchUserProfile(); 
            fetchTodoListsArray();

    }, [])
    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return (
            <BigErrorMessage />
        )
    }
    return (
    <TodoListsListContainer>
        {
            toggleCreateList && (
                <CreateList
                    setLoading={setLoading}
                    setError={setError}
                    setToggleCreateList={setToggleCreateList}
                    fetchTodoListsArray={fetchTodoListsArray}
            />

            )
        }
        <div class="button-div">
            <button onClick={() => setToggleCreateList(true)} class="nice-button">&#43; Create new To-do List</button>
        </div>        
        <div className="scrollable-div">
            {
                todoListsArray.map(todoList => (
                    <ListInfo key={todoList.listId} listId={todoList.listId} title={todoList.title} lastModifiedTime={formatLocalDate(todoList.lastModifiedTime)}/>
                ))
            }
        </div>
    </TodoListsListContainer>
    )
}


export default TodoListsList;