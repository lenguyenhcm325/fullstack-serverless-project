import React from "react";
import { MessageContainer } from "./big-error-message.styles";

const BigErrorMessage = () => {
    return (
        <MessageContainer>
            <div className="error-symbol">✕</div>
            <div className="error-message">
                <h2>Something Went Wrong</h2>
                <p>Please try again later.</p>
            </div>
        </MessageContainer>
    )
}
export default BigErrorMessage