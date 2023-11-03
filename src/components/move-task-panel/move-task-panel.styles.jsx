import styled from "styled-components";

export const MoveTaskPanelContainer = styled.div`

    border: 1px solid #dee2e6;
    background-color: #a5d8ff;
    width: 128px;
    border-radius: 4px;
    display: grid;
    padding: 8px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    grid-gap: 4px;
    position: absolute;
    left: 100%; 
    top: 100%;
    z-index: 999;
    transform: translate(-22%, -40%);


    & .move-button {
        background-color: white;  
        border: none;  
        color: #black;  
        padding: 8px 12px;  
        text-align: center; 
        text-decoration: none;  
        display: inline-block; 
        font-size: 14px;  
        margin: 4px 2px;  
        cursor: pointer;  
        border-radius: 4px;  
        transition: background-color 0.3s, transform 0.3s;  
    
        &:hover {
            background-color: white; 
            transform: scale(1.05);
        }
    
        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
        }
    
        &:active {
            background-color: #004085; 
            transform: scale(1);
        }
    }



`