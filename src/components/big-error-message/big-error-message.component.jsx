import React from "react";
import { MessageContainer } from "./big-error-message.styles";

const BigErrorMessage = () => {
    return (
        <MessageContainer>
            <div class="error-symbol">✕</div>
            <div class="error-message">
                <h2>Something Went Wrong</h2>
                <p>Please try again later.</p>
            </div>
        </MessageContainer>
    )
}
export default BigErrorMessage