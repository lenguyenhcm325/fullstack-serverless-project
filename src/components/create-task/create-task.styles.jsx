import styled from "styled-components";


export const CreateTaskContainer = styled.div`
    position: absolute; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;
    display: flex; 
    align-items: center;
    padding: 32px 40px;
    border-radius: 4px;
    border: 2px solid #dee2e6;
    background-color: #e7f5ff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);


& label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
}

& input[type="text"] {
    width: 100%;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background-color: #ffffff;
    transition: border-color 0.3s ease;
    font-size: 16px;

    &:focus {
        border-color: #adb5bd;
        outline: none;
        box-shadow: 0 0 0 3px rgba(173, 181, 189, 0.5);
    }

    &::placeholder {
        color: #adb5bd;
    }
}

& button[type="submit"] {
    margin-top: 12px;
    padding: 10px 16px;
    border-radius: 4px;
    border: none;
    background-color: #38a1db;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3292bf;
    }

    &:active {
        background-color: #2b7da9;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(56, 161, 219, 0.5);
    }
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


`