// components/Layout.js
import React, {useEffect, useState} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify"
import ToProfileButton from '../to-profile-button/to-profile-button.component';




export function Layout() {
  console.log("check to see if it re-renders1")
  console.log("check to see if it re-renders2")
  console.log("check to see if it re-renders3")
  const location = useLocation(); 
  const currentPathname = location.pathname;
  console.log(currentPathname)
  const [userObject, setUserObject] = useState(null);
  const [error, setError] = useState(null);
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  useEffect(() => {
    async function currentAuthenticatedUser() {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        });
        setUserObject(user); 
        return user;
      } catch(err) {
        console.log(err);
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
    <>

      {
        userObject? (<div>User ID: {userObject.attributes.sub}</div>) : (<div>Nothing for you here...</div>)
      }
      {
        error? (<div>there is an error</div>) : (<div>there is no error</div>)
      }
      {
        currentPathname.includes("/profile/") ? null : <ToProfileButton/>
      }

      <Outlet />
    </>
  );
}

{/* <nav>
<Button onClick={() => navigate('/')}>Home</Button>
<Button onClick={() => navigate('/protected')}>
  First Protected Route
</Button>
<Button onClick={() => navigate('/protected2')}>
  Second Protected Route
</Button>
{route !== 'authenticated' ? (
  <Button onClick={() => navigate('/login')}>Login</Button>
) : (
  <Button onClick={() => logOut()}>Logout</Button>
)}
</nav>
<Heading level={1}>Example Auth Routes App</Heading>
<View>
{route === 'authenticated' ? 'You are logged in!' : 'Please Login!'}
</View> */}