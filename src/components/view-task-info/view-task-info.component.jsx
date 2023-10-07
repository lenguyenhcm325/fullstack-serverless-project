import React from "react";
import { ViewTaskInfoContainer } from "./view-task-info.styles";

const ViewTaskInfo = () => {



    return(

        <ViewTaskInfoContainer>
            <div class="field">
                <div className="label-with-icon">
                    <span class="label">Date</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>

                <p class="data">2023-10-12</p>
                
            </div>
            <div class="field">
                <label for="description" class="label">Description:</label>
                <input type="text" id="description" value="This is a prepopulated description" class="description-input" />
            </div>
            <div class="field">
                <div className="label-with-icon">
                    <span class="label">Collaborators</span>
                    <img className="edit-icon" src="../../../../public/svg/edit.svg" alt="" />
                </div>
                <ul class="collaborators-list">
                    <li>Collaborator 1</li>
                    <li>Collaborator 2</li>
                    <li>Collaborator 3</li>
                </ul>
                
            </div>
            
        </ViewTaskInfoContainer>

    )
}


export default ViewTaskInfo;