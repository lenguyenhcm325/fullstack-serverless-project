import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { MoveTaskPanelContainer } from "./move-task-panel.styles";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectJwtToken } from "../../store/user/user.selector";

const MoveTaskPanel = ({
    taskId, 
    status,
    setToggleMovePanel,
    fetchTasksFromList
}) => {
    const jwtToken = useSelector(selectJwtToken)
    const {listId} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const updateTaskStatus = async(status) => {
        console.log("inside update task status!")
        try {
            setLoading(true);
            const response = await fetch(`${apiEndpoint}/tasks/${taskId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        listId,
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
        fetchTasksFromList()
        console.log("finish handleUpdateTaskStatus")
        // setTimeout(() => {
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