import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { MoveTaskPanelContainer } from "./move-task-panel.styles";
import {Auth} from "aws-amplify"
const MoveTaskPanel = ({
    taskId, 
    status,
    setToggleMovePanel
}) => {
    const {listId} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const updateTaskStatus = async(status) => {
        console.log("inside update task status!")
        try {
            setLoading(true);
            const response = await fetch(`${apiEndpoint}/lists/${listId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        taskId, 
                        status          

                    })
                },

            )
            console.log("inside the try block!")
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result updateTaskStatus");
            console.log(result);
            
        }
        catch(error){
            console.log(error)
            setError(error);
        }finally {
            setLoading(false);
        }
    }
    
    const handleUpdateTaskStatus = async (event) => {
        const statusAfter = event.target.value;
        console.log(statusAfter)
        await updateTaskStatus(statusAfter)
        setToggleMovePanel(false)
        console.log("finish handleUpdateTaskStatus")
        // setTimeout(() => {
            window.location.reload()
        // }, 3000)

        

    }

    const options = {
        todo: (
            <button onClick={handleUpdateTaskStatus} value="todo" className="move-button">
                Move to To do
            </button>
        ),
        doing: (
            <button onClick={handleUpdateTaskStatus} value="doing" className="move-button">
                Move to Doing
            </button>
        ),
        done: (
            <button onClick={handleUpdateTaskStatus} value="done" className="move-button">
                Move to Done
            </button>            
        )
    }

    const getMoveButtons = () => {
        const buttons = [];
        for (let key in options){
            if (key !== status){
                buttons.push(options[key])
            }
        }
        return buttons;
    }

    return (
        <MoveTaskPanelContainer>
        {
            getMoveButtons()
        }    


        </MoveTaskPanelContainer>
    )
}

export default MoveTaskPanel;