import React from "react";
import { MovePanelContainer } from "./move-panel.styles";

const MovePanel = () => {


    return (
        <MovePanelContainer>
            <button className="move-button">
                Move to A
            </button>
            <button className="move-button">
                Move to B
            </button>

        </MovePanelContainer>
    )
}

export default MovePanel;