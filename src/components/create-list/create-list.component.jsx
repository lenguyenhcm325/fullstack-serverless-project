import React, { useState} from "react";
import { CreateListContainer } from "./create-list.styles";
import { useSelector } from "react-redux";
import { selectJwtToken, selectUserInfo } from "../../store/user/user.selector";

const CreateList = ({setToggleCreateList, fetchTodoListsArray, setLoading, setError}) => {
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const jwtToken = useSelector(selectJwtToken)
    const userId = useSelector(selectUserInfo).userId
    const [title, setTitle] = useState("");
    const handleInputChange = (event) => {
        setTitle(event.target.value);
    }

    const handleClose = () => {
        setToggleCreateList(false);
    }
    const handleCreateTodoList = async (title) => {
        try {
            setLoading(true);
            const createTodoEndpoint = `${apiEndpoint}/listsMetadata`;
            const response = await fetch(createTodoEndpoint, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title
                })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of creating user todo list");
            console.log(result);

        }
        catch(error){
            console.error(error)
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    const handleSubmit =  async(event) => {
        event.preventDefault(); 
        console.log("Form got submitted with " + title);
        setToggleCreateList(false);
        await handleCreateTodoList(title)
        console.log("after the handleCreateTodoList")
        fetchTodoListsArray()
        
    
    }
    return (
        <CreateListContainer>
            <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="title">Title of the To-do list</label>
                <input value={title} onChange={handleInputChange} type="text" id="title" name="title" required/>
                <button type="submit" >Submit</button>
            </form>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </CreateListContainer>
    )
}

export default CreateList;