import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToProfileButtonContainer } from "./to-profile-button.styles";
import { Auth } from "aws-amplify";
const ToProfileButton = () => {

    const[userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async() => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUserId(user.attributes.sub);
            }catch(err){
                console.log("User not authenticated:", err);
                setUserId(null);
            }
        }
        fetchUserId();
    }, [])

    return(
       <ToProfileButtonContainer>
        {userId &&
            (
                <Link to={`/profile/${userId}`}>
                    <button>To Profile</button>
                </Link>
            ) 
        }
       </ToProfileButtonContainer> 
    )
}

export default ToProfileButton