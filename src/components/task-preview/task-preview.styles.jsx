import styled from "styled-components";

export const TaskPreviewContainer = styled.div`
    position: relative;
    display: grid; 
    row-gap: 12px;
    grid-template-columns: 80% 20%; 
    grid-template-rows: repeat(3, 1fr);
    border: 1px solid #c1c1c1;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

&:hover {
    background-color: #e7f5ff;
}

& .space-between {
    display: flex; 
    justify-content: space-between;
    align-items: center;
}

& .icon-grid-block {
    display: flex; 
    justify-content: center;
    align-items: center;

    padding: 4px;
    
}

& .view-task-block {
    grid-column: 2; 
    grid-row: 1;
}

& .change-status-block {
    grid-column: 2; 
    grid-row: 2;
}



& .circle-bg-icon {
    display: flex; 
    justify-content: center;
    align-items: center;    
    width: 24px;
    height: 24px;
    background-color:#e7f5ff;

    border-radius: 50%; 
}

& .note-preview {
    grid-column: 1;
    grid-row: 2;
}

& .email {
    grid-row: 3; 
    grid-column: 1
}

& .profile-pic {
    align-self: center;
    justify-self: center;
    grid-row: 3; 
    grid-column: 2;
    overflow: hidden;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #4dabf7; /* Placeholder, replace with image */
}

& .profile-pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    object-position: center;
}

& .icon {
    width: 16px; 
    height: 16px;
    cursor: pointer;
    transition: opacity 0.3s;
}

& .icon:hover {
    opacity: 0.7;
}

& h3 {
    font-size: 16px;

}

& .task-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

& .task-details span {
    color: #1971c2
}




`

