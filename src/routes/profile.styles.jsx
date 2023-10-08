import styled from "styled-components";


export const ProfileContainer = styled.div`

    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 5px;


& h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

& .profile-info {
    padding: 10px;
}

& .profile-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

& label {
    font-weight: bold;
    color: #555;
}

& span {
    color: #333;
}

& .button-div {
    margin-top: 24px;
}

/* Style the nice button */
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

& .scrollable-div {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
}

& .todo-list-container {
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);  /* adding border */
    border-radius: 5px;  /* keeping consistent with theme */
    padding: 10px;  /* adding padding to give space inside border */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);  /* subtle shadow, similar to the theme */
    background-color: #e7f5ff;  /* light background color */
}

& .todo-item {
    display: block;
    padding: 8px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f8f8f8;
    text-decoration: none;
    transition: background-color 0.3s;
}

& .todo-item:hover {
    background-color: #ececec;
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
