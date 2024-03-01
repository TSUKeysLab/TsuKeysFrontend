import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../components/login';
import UsersPage from '../components/users';
import { AuthLayout } from '../layouts/AuthLayout';

export default function Router(){
    return(
        <Routes>
            <Route path='/' element={<Header/>}/>
            <Route path='/login' element={
                <>
                    <Header/>
                    <Login/>
                </>
            }/>
            <Route path='/users' element={
                <AuthLayout children={<UsersPage/>}/>
            }/>
        </Routes>
    );
}