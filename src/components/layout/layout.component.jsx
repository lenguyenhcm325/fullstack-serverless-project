import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify"
import ToProfileButton from '../to-profile-button/to-profile-button.component';
import { LayoutContainer } from './layout.styles';



export function Layout() {
  const location = useLocation(); 
  const currentPathname = location.pathname;
  const [userObject, setUserObject] = useState(null);
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: false
        });
        console.log(user)
        console.log(user)
        console.log(user)
        console.log(user)
        console.log(user)
        console.log(user)
        setUserObject(user); 
        return user;
      } catch(err) {
        return;
      }
    };
    currentAuthenticatedUser();
  }, [Auth])

 
  const navigate = useNavigate();
  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <LayoutContainer>
      <div className='top-bar'>
        <div className='dev-logging'>
        {
          userObject? (<div>User's Email: {userObject.attributes.email}</div>) : (<div>You are not logged in</div>)
        }
        </div>
        <div className='buttons-div'>
        {
          route !== "authenticated" ? (
            <Button className='login-logout-btn' onClick={() => navigate('/login')}>Login</Button>
          ) : (
            <Button className='login-logout-btn' onClick={() => logOut()}>Logout</Button>  
        )}
        {
          currentPathname.includes("/profile/") ? null : <ToProfileButton/>
        }
        </div>
      </div>
      <Outlet />
    </LayoutContainer>
  );
}