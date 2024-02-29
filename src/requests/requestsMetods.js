import React from "react";

export async function LoginFetch(data){

    const response = await fetch('http://89.111.174.112:8181/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    return response.json();

}
export async function LogoutFetch(token){

    const response = await fetch('http://89.111.174.112:8181/user/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response
}
export async function ProfileFetch(token){

    const response = await fetch('http://89.111.174.112:8181/user/getProfile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.json()
}
export async function UsersFeedFetch(Url,token){

    const response = await fetch(Url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.json()
}
export async function GiveRoleFetch(Url,token){

    const response = await fetch(Url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    return response
}