import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify"
import { useParams } from 'react-router-dom';
import { ProfileContainer } from "../profile.styles";
import UploadProfilePic from "../../components/upload-profile-pic/upload-profile-pic.component";
const Profile = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {

    }, [])


    const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
    const {userId} = useParams();
    useEffect(() => {
        let accessKeyId, secretAccessKey, sessionToken
        Auth.currentCredentials()
        .then(credentials => {
            // console.log('Access Key:', credentials.accessKeyId);
            // accessKeyId = credentials.accessKeyId
            // console.log('Secret Key:', credentials.secretAccessKey);
            // secretAccessKey = credentials.secretAccessKey
            // console.log('Session Token:', credentials.sessionToken);
            // sessionToken = credentials.sessionToken
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
                    console.log("this is the result");
                    console.log(result);
                    setUserInfo(result);
                }
                catch(error){
                    setError(error);
                }finally {
                    setLoading(false);
                }
            }
            fetchUserProfile(); 
        })
        .catch(err => {
            console.error(err)
        });

    }, [])
    if (loading){
        return <div>Loading, please wait</div>
    }
    if (error){
        return <div>Error: {error.message}</div>
    }

    if (userInfo){

    
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
                <div>
                    <UploadProfilePic userId={userId}/>
                </div>
                <div class="button-div">
                    <button class="nice-button">&#43; Create new To-do List</button>
                </div>
            </div>
        
        </ProfileContainer>
        )
    }
}

export default Profile; 
                    // console.log({
                    //     "X-Access-Key-ID": accessKeyId,
                    //     "X-Secret-Access-Key": secretAccessKey,
                    //     "X-Session-Token": sessionToken   
                    // })

                                // "X-Access-Key-ID": accessKeyId,
                                // "X-Secret-Access-Key": secretAccessKey,
                                // "X-Session-Token": sessionToken