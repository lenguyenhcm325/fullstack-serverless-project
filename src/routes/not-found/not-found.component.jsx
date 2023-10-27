import React from "react";
import { NotFoundContainer } from "./not-found.styles";

const NotFound = () => {
    return (

        <NotFoundContainer>
            <div class="not-found-content">
                <h1>404</h1>
                <p>Sorry, the page you're looking for cannot be found.</p>
                <a href="/">Go Back Home</a>
            </div>
        </NotFoundContainer>
    )
}

export default NotFound;