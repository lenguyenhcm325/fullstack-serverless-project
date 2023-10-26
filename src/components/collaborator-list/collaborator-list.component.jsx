import React, {Fragment} from "react";
import { CollaboratorListContainer } from "./collaborator-list.styles";
const CollaboratorList = ({
    usersWithRole
}) => {

    const capitalizeFirstLetter = (myString) => {
        const capitalized = myString.charAt(0).toUpperCase() + myString.slice(1);
        return capitalized;
    }
    return (
        <CollaboratorListContainer>
        {/* <div className="user-info">
            <p className="email">user@example.com</p>
            <span className="role collaborator">Collaborator</span>

        </div>
        <div className="user-info">
            <p className="email">user@example.com</p>
            <span className="role collaborator">Collaborator</span>

        </div>
        <div className="user-info">
            <p className="email">user@example.com</p>
            <span className="role collaborator">Collaborator</span>

        </div> */}
        {
            usersWithRole.map(user => (
                <div className="user-info" key={user.email}>
                    <p className="email">{user.email}</p>
                    <span className="role">{capitalizeFirstLetter(user.role)}</span>
    
                </div>                
            ))
        }

        </CollaboratorListContainer>
    )
}

export default CollaboratorList;