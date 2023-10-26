import styled from "styled-components";

export const NotFoundContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;

    // background-color: #e7f5ff; /* BLUE 0 */


& .not-found-content {
    text-align: center;
    max-width: 500px;
}

& .not-found-content h1 {
    font-size: 8rem;
    color: #339af0; /* BLUE 5 */
    margin-bottom: 1rem;
}

& .not-found-content p {
    font-size: 1.5rem;
    color: #1864ab; /* BLUE 9 */
    margin-bottom: 2rem;
}

& .not-found-content a {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    background-color: #228be6; /* BLUE 6 */
    color: white;
    transition: background-color 0.2s ease;
}

& .not-found-content a:hover {
    background-color: #1c7ed6; /* BLUE 7 */
}


`