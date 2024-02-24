import React from "react";

export async function LoginFetch(data){
    // try {
    const response = await fetch('https://blog.kreosoft.space/api/account/login', {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    debugger
    return response.json();

}
export async function LogoutFetch(token){

    const response = await fetch('http://89.111.174.112:8181/Logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json()
}