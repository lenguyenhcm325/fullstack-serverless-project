import React from "react";
import { LoadingSpinnerContainer } from "./loading-spinner.styles";

const LoadingSpinner = () => {
    return(
        <LoadingSpinnerContainer className="lds-ring">
            <div></div><div></div><div></div><div></div>
        </LoadingSpinnerContainer>
    )
}

export default LoadingSpinner;