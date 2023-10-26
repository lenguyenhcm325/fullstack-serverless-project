import styled from "styled-components";


export const ListContainer = styled.div`

    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #e0e0e0;
    width: 95%;
    margin: 50px 10px;
    background-color: #f7f7f7;


& .column {
    width: 30%;
    min-height: 200px;
    padding: 10px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #ffffff;
}

& h2 {
    text-align: center;
    margin-bottom: 20px;
}



& .toggle-create-task {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3498db;
    color: #fff;
    cursor: pointer;
}

& .toggle-create-task:hover {
    background-color: #2980b9;
}

& .collaborators-section {
    position: absolute;
    right: 20px;
    top: 96px;

}
`