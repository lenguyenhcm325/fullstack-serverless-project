import React, { useState} from "react";
import { CreateListContainer } from "./create-list.styles";
const CreateList = ({handleCreateTodoList, setToggleCreateList}) => {
    const [title, setTitle] = useState("");
    const handleInputChange = (event) => {
        setTitle(event.target.value);
    }

    const handleClose = () => {
        setToggleCreateList(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Form got submitted with " + title);
        handleCreateTodoList(title)
        console.log("after the handleCreateTodoList")
        setToggleCreateList(false);
    
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