import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify"
import formatLocalDate from "../../utils/format-local-date";
import { useParams } from 'react-router-dom';
import { ProfileContainer } from "../profile.styles";
import CreateList from "../../components/create-list/create-list.component";
import UploadProfilePic from "../../components/upload-profile-pic/upload-profile-pic.component";
const Profile = () => {
    const {userId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [todoListsArray, setTodoListsArray] = useState([]);
    const [toggleCreateList, setToggleCreateList] = useState(false); 

    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;




    const handleCreateTodoList = async (title) => {
        try {
            setLoading(true);
            const createTodoEndpoint = `${apiEndpoint}/listsMetadata`;
            const response = await fetch(createTodoEndpoint, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                },
                body: JSON.stringify({
                    userId: userId,
                    title: title
                })
            })
            if (!response.ok){
                throw new Error('Something went wrong!');
            }
            const result = await response.json();
            console.log("this is the result of creating user todo list");
            console.log(result);

        }
        catch(error){
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Auth.currentCredentials()
        .then(credentials => {
            const fetchUserProfile = async() => {
                try {
                    const response = await fetch(`${apiEndpoint}/profile/${userId}`, 
                        {
                            headers: {
                                Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                            }
                        }
                    )
    
                    if (!response.ok){
                        throw new Error('Something went wrong!');

                    }
                    const result = await response.json();
                    console.log("this is the result fetchUserProfile");
                    console.log(result);
                    setUserInfo(result);
                }
                catch(error){
                    setError(error);
                }finally {
                    setLoading(false);
                }
            }
            const fetchTodoListsArray = async() => {
                try {
                    const response = await fetch(`${apiEndpoint}/listsMetadata`, 
                        {
                            headers: {
                                Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                            }
                        }
                    )
                    if (!response.ok){
                        throw new Error('Something went wrong!');
                    }
                    const result = await response.json();
                    console.log("this is the result fetch lists metadata");
                    console.log(result);
                    setTodoListsArray(result);
                }
                catch(error){
                    setError(error);
                }finally {
                    setLoading(false);
                }
            }
            fetchUserProfile(); 
            fetchTodoListsArray();
        })
        .catch(err => {
            console.error(err)
        });

    }, [])
    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return <div>Error: {error.message ? error.message : JSON.stringify(error)}</div>
    }

    if (Object.keys(userInfo).length !== 0){
    console.log("this is user info")
    console.log(userInfo)
    console.log(userInfo)
    console.log(userInfo)
    console.log(userInfo)
    console.log(userInfo)
    return (
        <ProfileContainer>
            <h1>User Profile</h1>
            <div class="profile-info">
                <div class="profile-row">
                    <label for="email">Email:</label>
                    <span id="email">{userInfo.email.S}</span>
                </div>
                <div class="profile-row">
                    <label for="userId">User ID:</label>
                    <span id="userId">{userInfo.userId.S}</span>
                </div>
                <div class="profile-row">
                    <label for="dateJoined">Date Joined:</label>
                    <span id="dateJoined">{userInfo.dateJoined.S}</span>
                </div>
                <div class="profile-row">
                    <label for="profilePic">Profile Pic:</label>
                </div>
                <div>
                    <UploadProfilePic userId={userId}/>
                </div>
                <div class="button-div">
                    <button onClick={() => setToggleCreateList(true)} class="nice-button">&#43; Create new To-do List</button>
                </div>
            </div>
            {
                toggleCreateList && (
                    <CreateList handleCreateTodoList={handleCreateTodoList} 
                    setToggleCreateList={setToggleCreateList}
                />

                )
            }
            <div className="scrollable-div">
                {
                    todoListsArray.map(todoList => (
                        <div className="todo-list-container">
                            <div className="todo-list-item">
                            <div class="todo-title">{todoList.title}</div>
                            <div class="todo-date">Last Modified: {formatLocalDate(todoList.lastModifiedTime)}</div>
                            </div>
                        </div>
                    ))
                }
            </div>


            

        </ProfileContainer>
        )
    }
}

export default Profile; 