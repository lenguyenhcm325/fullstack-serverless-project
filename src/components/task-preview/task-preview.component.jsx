import React, {useState} from "react";
import { TaskPreviewContainer } from "./task-preview.styles";
import MovePanel from "../move-panel/move-panel.component";
const TaskPreview = () => {
    const [toggleMovePanel, setToggleMovePanel] = useState(false);
    const handleToggleMovePanel =() => {
        setToggleMovePanel(!toggleMovePanel)
    }
    return (
    <TaskPreviewContainer>
        <h3>Task Title</h3>
        <p className="date">12/09/2023</p>
        <div className="icon-grid-block">
            <div className="circle-bg-icon">
                <img onClick={handleToggleMovePanel} className="edit-icon" src="../../../../public/svg/settings.svg" alt="" />
            </div>
        {
            toggleMovePanel && (
                <MovePanel/>
            )
        }
        </div>


            <p className="email">email@example.com</p>
            <div class="profile-pic"></div>

    </TaskPreviewContainer>
    )
}

export default TaskPreview;