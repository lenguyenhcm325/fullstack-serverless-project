import React, {useEffect, useState} from "react";
import { TaskPreviewContainer } from "./task-preview.styles";
import ViewTaskInfo from "../view-task-info/view-task-info.component";
import MoveTaskPanel from "../move-task-panel/move-task-panel.component";
const TaskPreview = ({
    title,
    thumbnailUrl,
    email,
    taskId,
    status
}) => {
    
    const [toggleEditTask, setToggleEditTask] = useState(false);
    const [toggleMovePanel, setToggleMovePanel] = useState(false);
    const handleToggleMovePanel =(event) => {
        event.stopPropagation();
        setToggleMovePanel(!toggleMovePanel)
    }
    return (
    <TaskPreviewContainer onClick={() => setToggleEditTask(!toggleEditTask)}>
        <h3>{title}</h3>
        <p className="date">DD/MM/YYYY</p>
        <div className="icon-grid-block">
            <div className="circle-bg-icon">
                <img onClick={handleToggleMovePanel} className="edit-icon" src="../../../../public/svg/settings.svg" alt="" />
            </div>
        {
            toggleMovePanel && (
                <MoveTaskPanel taskId={taskId} status={status} setToggleMovePanel={setToggleMovePanel}/>
            )
        }
        </div>


            <p className="email">{email}</p>
            <div className="profile-pic">
                <img src={thumbnailUrl? thumbnailUrl : "https://static.thenounproject.com/png/5034901-200.png"} alt="" />
            </div>
        {
            toggleEditTask && (
                <ViewTaskInfo setToggleEditTask={setToggleEditTask} />
            )
        }
    </TaskPreviewContainer>
    )
}

export default TaskPreview;