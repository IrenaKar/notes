import './App.css';
import React, { useContext, } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Homepage from './Components/Pages/Homepage';
import AuthenticationPage from './Components/Pages/AuthenticationPage';
import UserProfile from './Components/Profile/UserProfile';
import Context from './Store/Context';
import Form from './Components/Todo/TodoForm/Form';
import Modal from './Components/Modal/Modal';

function App() {
  const { isLoggedIn, open } = useContext(Context)
  return (
    <div className="App">
      <Layout >
          <Routes>
            {!isLoggedIn && (<Route path='/authentication' element={<AuthenticationPage />} />)}
            {isLoggedIn && (<Route path='/add-task' element={<Form />} />)}
            {isLoggedIn && (<Route path='/delete-task' element={open ? <Modal /> : <Navigate to="/" />} />)}
            <Route path='/' element={<Homepage />} />
            <Route path='/profile' element={isLoggedIn ? <UserProfile /> : <Navigate to="/authentication" />} />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
