import styled from "styled-components";

export const MovePanelContainer = styled.div`

    border: 1px solid #dee2e6;
    background-color: #d0ebff;
    width: 128px;
    border-radius: 4px;
    display: grid;
    padding: 8px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    grid-gap: 20px;
    position: absolute;
    left: 100%; 
    top: 100%;
    z-index: 999;
    transform: translate(-20%, -50%);


    & .move-button {
    }



`