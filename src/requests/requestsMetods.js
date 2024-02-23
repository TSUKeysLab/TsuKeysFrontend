import React from "react";

export async function Login(data){
    try {
        const response = await fetch('https://example.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Ошибка входа: ' + response.statusText);
        }
        console.log('Успешный вход:', data);
        return await response.json();
    } catch (error) {
        console.error('Ошибка входа:', error.message);
        throw error;
    }
}
export async function Logout(urlToFetch, token){
    try {
        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            }
        });
        if (!response.ok) {
            throw new Error('Ошибка входа: ' + response.statusText);
        }
        // const data = await response.json();

        // console.log('Успешный вход:', data);
        return response.status
    } catch (error) {
        console.error('Ошибка входа:', error.message);
        throw error;
    }
}