import styled from "styled-components";


export const UploadProfilePicContainer = styled.div`


& #pic-upload {
    display: none;
}

& .custom-file-upload {
    padding: 10px 20px;
    background-color: #3498db;
    color: #ffffff;
    border-radius: 5px;
    border: 2px solid #2980b9;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

& .custom-file-upload:hover {
    background-color: #2980b9;
}

& .preview-image {

    display: block;
    border: 1px solid black;
    height: 96px;
    margin: 16px 0;

}

& .add-pic {
    font-weight: 700;
    padding: 10px 20px;
    background-color: #3498db;
    color: #ffffff;
    border-radius: 5px;
    border: 2px solid #2980b9;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

& .successful-msg-div {
    color: green;
    font-weight: 700;
    margin: 8px 0px;

}

& .failed-msg-div {
    color: red;
    font-weight: 700;
    margin: 8px 0px;
}

`