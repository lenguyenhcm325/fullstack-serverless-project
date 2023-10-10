import React from "react";
import { AddCollaboratorButtonContainer } from "./add-collaborator-button.styles";


const AddCollaboratorButton = ({setToggleAddCollaborator}) => {
    return(
        <AddCollaboratorButtonContainer>
            <button onClick={() => setToggleAddCollaborator(true)}>&#43; Add collaborator</button>
        </AddCollaboratorButtonContainer>
    )
}

export default AddCollaboratorButton