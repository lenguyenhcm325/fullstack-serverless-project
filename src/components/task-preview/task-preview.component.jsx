import React, {useEffect, useState} from "react";
import { TaskPreviewContainer } from "./task-preview.styles";
import ViewTaskInfo from "../view-task-info/view-task-info.component";
import MoveTaskPanel from "../move-task-panel/move-task-panel.component";
const TaskPreview = (props) => {
    const {
        title,
        thumbnailUrl,
        email,
        taskId,
        status, 
        note,
        fetchTasksFromList
    } = props;

    function truncateString(str) {
        if (str.length > 20) {
            return str.substring(0, 20) + '...';
        }
        return str;
    }
    
    const [toggleEditTask, setToggleEditTask] = useState(false);
    
    const [toggleMovePanel, setToggleMovePanel] = useState(false);
    const handleToggleMovePanel =(event) => {
        event.stopPropagation();
        setToggleMovePanel(!toggleMovePanel)
    }

    const handleToggleEditTask = () => {
        setToggleEditTask(true);
    }
    return (
    <TaskPreviewContainer >
        <h3>{title}</h3>
        <p className="note-preview">{
            note? (truncateString(note)) : ("No note")
        }</p>
        <div className="icon-grid-block view-task-block">
            <div className="circle-bg-icon ">
                <img onClick={handleToggleEditTask} className="view-task-icon icon" src="https://serverless-project-assets.s3.eu-central-1.amazonaws.com/svg/edit.svg" alt="" />                
            </div>
            {
            toggleEditTask && (
                <ViewTaskInfo taskId={taskId} status={status} setToggleEditTask={setToggleEditTask} {...props} fetchTasksFromList={fetchTasksFromList}/>
            )
        }
        </div>
        <div className="icon-grid-block change-status-block">
            <div className="circle-bg-icon">
                <img onClick={handleToggleMovePanel} className="change-status-icon icon" src="https://serverless-project-assets.s3.eu-central-1.amazonaws.com/svg/settings.svg" alt="" />
            </div>
        {
            toggleMovePanel && (
                <MoveTaskPanel taskId={taskId} status={status} setToggleMovePanel={setToggleMovePanel} fetchTasksFromList={fetchTasksFromList}/>
            )
        }
        </div>


            <p className="email">{email}</p>
            <div className="profile-pic">
                <img src={thumbnailUrl? thumbnailUrl : "https://static.thenounproject.com/png/5034901-200.png"} alt="" />
            </div>

    </TaskPreviewContainer>
    )
}

export default TaskPreview;