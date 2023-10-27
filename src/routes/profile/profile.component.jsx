import TodoListsList from "../../components/todo-lists-list/todo-lists-list.component";
import { useParams } from 'react-router-dom';
import { ProfileContainer } from "./profile.styles";
import { useSelector } from "react-redux";
import {selectUserInfo } from "../../store/user/user.selector";
import UploadProfilePic from "../../components/upload-profile-pic/upload-profile-pic.component";
const Profile = () => {
    const userInfo = useSelector(selectUserInfo)
    const {userId} = useParams();
    if (Object.keys(userInfo).length !== 0){
    return (
        <ProfileContainer>
            <h1>User Profile</h1>
            <div class="profile-info">
                <div class="profile-row">
                    <label htmlFor="email">Email:</label>
                    <span id="email">{userInfo.email}</span>
                </div>
                <div class="profile-row">
                    <label htmlFor="userId">User ID:</label>
                    <span id="userId">{userInfo.userId}</span>
                </div>
                <div class="profile-row">
                    <label htmlFor="dateJoined">Date Joined:</label>
                    <span id="dateJoined">{userInfo.dateJoined}</span>
                </div>
                <div class="profile-row">
                    <label htmlFor="profilePic">Profile Pic:</label>
                </div>
                <div>
                    <UploadProfilePic userId={userId}/>
                </div>
            </div>
            <TodoListsList/>
        </ProfileContainer>
        )
    }
}
export default Profile; 