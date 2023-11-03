import React from "react";
import { ListInfoContainer } from "./list-info.styles";
import { Link } from "react-router-dom";
const ListInfo = ({
    title, lastModifiedTime, listId
}) => {
    return (
        <ListInfoContainer>
            <Link className="link-tag" to={`/lists/${listId}`} >
                <div className="todo-list-item">
                    <div className="todo-title">{title}</div>
                    <div className="todo-date">Last Modified: {lastModifiedTime}</div>
                </div>
            </Link>
        </ListInfoContainer>
    )
}
export default ListInfo;