import React, {Fragment, useState, useEffect} from "react"
import TaskPreview from "../../components/task-preview/task-preview.component"
import ViewTaskInfo from "../../components/view-task-info/view-task-info.component"
import { ListContainer } from "./list.styles"
const List = () => {
    return (
        <ListContainer>
        <div class="column">
            <h2>To do</h2>
            <TaskPreview/>
            <button>+ Add task</button>
        </div>
        <div class="column">
            <h2>Doing</h2>
            
            <TaskPreview/>
            <TaskPreview/>

            <button>+ Add task</button>
        </div>
        <div class="column">
            <h2>Done</h2>
            <TaskPreview/>
            <button>+ Add task</button>
        </div>
        {/* <ViewTaskInfo/> */}
    </ListContainer>


    )
}

export default List; 