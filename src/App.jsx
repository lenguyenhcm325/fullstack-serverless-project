import { Protected } from './components/protected/protected.component';
import { RequireAuth } from './RequireAuth';
import { Authenticator } from '@aws-amplify/ui-react';
import { Login } from './components/login/login.component';
import { ProtectedSecond } from './components/protected-second/protected-second.component';
import { Home } from './components/home/home.component';
import { Layout } from './components/layout/layout.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './routes/list/list.component';
import Profile from './routes/profile/profile.component';
import NotFound from './routes/not-found/not-found.component';
import './App.css';
import TaskNote from './components/task-note/task-note.component';
import { useDispatch} from 'react-redux';
import { selectJwtToken } from './store/user/user.selector';
import { useEffect } from 'react';
import { handleFetchInfo, handleGetJwt } from './store/user/user.thunk';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/test-draft" element={<TaskNote/>}/>
          <Route path="/profile/:userId" element={
          <RequireAuth>
          <Profile/>
          </RequireAuth>
          }/>
          <Route path="/lists/:listId" element={
            <RequireAuth>
            <List/>
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={< NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(handleGetJwt())
    dispatch(handleFetchInfo())
  }, [dispatch])
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  )
}

export default App
