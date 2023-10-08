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
import './App.css';
import TaskNote from './components/task-note/task-note.component';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  )
}

export default App
