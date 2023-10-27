import React from "react";
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