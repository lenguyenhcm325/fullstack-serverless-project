import styled from "styled-components";

export const CollaboratorListContainer = styled.div`
    


    width: 200px;
    font-family: Arial, sans-serif;
    background-color: #e7f5ff;
    display: flex;
    flex-direction: column;
    gap: 4px;

    justify-content: center;
    align-items: center;
    

& .user-info {
    width: 100%;
    background-color: #e7f5ff;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 5px;
    border: 2px solid #a5d8ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    text-align: center;
}

& .email {
    font-size: 14px;
    color: #1864ab;
    margin-bottom: 12px;
}

& .role {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #4dabf7;
    color: #fff;
}



`