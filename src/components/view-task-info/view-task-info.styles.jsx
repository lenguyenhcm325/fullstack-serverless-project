import styled from "styled-components";



export const ViewTaskInfoContainer = styled.div`
    position: fixed; 
    top: 50%; 
    left: 50%; 
    z-index: 9999;
    transform: translate(-50%, -50%);
    width: 50%;

    border: 2px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    background-color: #e7f5ff;
    

    & .field {

        margin-bottom: 10px;
    }

    & .label-with-icon { 
        display: flex; 
        align-items: center; 
        gap: 8px;

    }
    
    & .label {
        font-weight: bold;
    }
    
    & .data {
        margin-right: 10px;
    }
    
    & .edit-icon {
        width: 20px; 
        height: 20px;
        cursor: pointer;
        transition: opacity 0.3s;
    }
    
    & .edit-icon:hover {
        opacity: 0.7;
    }
    
    & .description-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-top: 5px;
    }
    

    
    & .close-button-container {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    & .close-button {
        font-size: 32px;
        border: none;
        background: none;
        cursor: pointer;
        padding: 5px 5px;
    
    }

    & .delete-button {
        background-color: #ff6b6b; /* red color */
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;
        font-weight: bold;
    
        /* Optional: Making it a bit darker when hovering */
        &:hover {
            background-color: #d32f2f;
        }
    }

`
