import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import RequestsPage from '../components/requestPage'
import KeysPage from '../components/keysPage'
import Login from '../components/login';
import UsersPage from '../components/users';
import { AuthLayout } from '../layouts/AuthLayout';

export default function Router(){
    return(
        <Routes>
            <Route path='/' element={
                <AuthLayout children={<RequestsPage/>}/>
            }/>
            <Route path='/login' element={
                <>
                    <Header/>
                    <Login/>
                </>
            }/>
            <Route path='/users' element={
                <AuthLayout children={<UsersPage/>}/>
            }/>
            <Route path='/requests' element={
                <AuthLayout children={<RequestsPage/>}/>
            }/>
            <Route path='/keys' element={
                <AuthLayout children={<KeysPage/>}/>
            }/>
        </Routes>
    );
}