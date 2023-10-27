import styled from "styled-components";


export const TodoListsListContainer = styled.div`


& .scrollable-div {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
}

& .nice-button {
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: #ffffff;
    border-radius: 5px;
    border: 2px solid #2980b9;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
}

/* Hover effect */
& .nice-button:hover {
    background-color: #2980b9;
    color: #ffffff;
}


`