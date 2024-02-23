import React from "react";

export async function LoginFetch(data){
    // try {
    const response = await fetch('https://blog.kreosoft.space/api/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response;

}
export async function LogoutFetch(token){

    const response = await fetch('https://blog.kreosoft.space/api/account/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.json()
}