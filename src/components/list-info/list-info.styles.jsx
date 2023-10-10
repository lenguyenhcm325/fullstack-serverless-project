import styled from "styled-components";



export const ListInfoContainer = styled.div`
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);  
    border-radius: 5px;  
    padding: 10px;  
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    background-color: #e7f5ff; 

    & .link-tag {
        text-decoration: none;
    }

    & .todo-title {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }
    
    & .todo-date {
        color: #555;
        font-size: 0.9em;
    }
`