import React from 'react';
import { Routes, Route} from 'react-router';
import {Header} from '../components/header';
import Login from '../components/login';
import UsersPage from '../components/users';
import { AuthLayout } from '../layouts/AuthLayout';
import KeysPage from "../components/Keys/keysPage";
import KeyContent from "../components/Keys/KeyContent";
import RequestsPage from "../components/Requests/requestsPage";

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
            <Route path='/keys' element={
                <AuthLayout children={<KeyContent/>}/>
            }/>
            <Route path='/requests' element={
                <AuthLayout children={<RequestsPage/>}/>
            }/>
        </Routes>
    );
}