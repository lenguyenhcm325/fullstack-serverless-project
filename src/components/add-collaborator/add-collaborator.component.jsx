import React, {useState} from "react";
import { AddCollaboratorContainer } from "./add-collaborator.styles";
import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { selectJwtToken } from "../../store/user/user.selector";
const AddCollaborator = ({setToggleAddCollaborator, fetchUsersWithRole}) => {
    const {listId} = useParams();
    const jwtToken = useSelector(selectJwtToken)
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setToggleAddCollaborator(false);
    }
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;

    const handleAddCollaborator = async () => {
        try {
            setLoading(true);
            setError(null);
            const createTodoEndpoint = `${apiEndpoint}/collaborators`;
            const response = await fetch(createTodoEndpoint, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify(
                    {
                        listId, 
                        email,
                        role: "collaborator"
                    })
            })
            if (!response.ok){
                if (response.status === 400){
                    setError("Unable to process your request. Please try again later.")
                }else {
                    throw new Error('Something went wrong!');
                }
            }else {
                setToggleAddCollaborator(false);
                fetchUsersWithRole();
            }
        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }        
    }

    const handleInputChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleAddCollaborator();
    }

    return (
        <AddCollaboratorContainer>
            <form onSubmit={handleSubmit}>
                <div className="form-inner">
                <label htmlFor="title">Email of the collaborator</label>
                <input value={email} onChange={handleInputChange} type="text" id="email" name="email" required/>
                {
                    error && (
                    <div className="error-message">Unable to process your request. Please check your input and try again later.</div>
                        )
                }
                <button type="submit" >Submit</button>
                </div>
            </form>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>            
        </AddCollaboratorContainer>
    )
}


export default AddCollaborator