import React, { useState, useEffect } from 'react';
import KeyBackRequest from "./keyBackRequest";
import { Container } from "react-bootstrap";

const DeanRequests = () => {
    const token = localStorage.token;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://89.111.174.112:8181/key/requests/dean`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setRequests(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <h4 className="text-success text-center">Загрузка...</h4>;
    }

    console.log(requests.length)

    if (requests.length === 0) {
        return <h4 className="text-success text-center mt-3">Нет входящих заявок</h4>;
    }

    return (
        <Container>
            {requests.map((request) => (

                <KeyBackRequest key={request.requestId} props={request}/>
            ))}
        </Container>
    );
};

export default DeanRequests;
