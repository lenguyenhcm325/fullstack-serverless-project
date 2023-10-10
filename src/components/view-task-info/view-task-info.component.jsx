import React, {useEffect} from "react";
import { ViewTaskInfoContainer } from "./view-task-info.styles";

const ViewTaskInfo = ({setToggleEditTask}) => {

    const handleClose = () => {
        console.log("it should be false!!!!!!!")
        console.log("it should be false!!!!!!!")

        setToggleEditTask(false)
        // setToggleEditTask(false)
        // setToggleEditTask(false)
    }

    return(

        <ViewTaskInfoContainer>
            <div className="field">
                <div className="label-with-icon">
                    <span className="label">Date</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>

                <p className="data">2023-10-12</p>
                
            </div>
            <div className="field">
                <label htmlFor="description" className="label">Description:</label>
                <input type="text" id="description" defaultValue="This is a prepopulated description" className="description-input" />
            </div>
            <div className="field">
                <div className="label-with-icon">
                    <span className="label">Collaborators</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>
                <ul className="collaborators-list">
                    <li>Collaborator 1</li>
                    <li>Collaborator 2</li>
                    <li>Collaborator 3</li>
                </ul>
            </div>
            <div className="close-button-container">
                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </ViewTaskInfoContainer>

    )
}


export default ViewTaskInfo;