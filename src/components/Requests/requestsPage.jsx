import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import RequestFilter from "./requestFilter";
import RequestList from "./requestList";


const RequestsPage = () => {

    const [updated, setUpdated] = useState(true)
    const [searchParams, setSearchParams] = useState({ statuses: "", sorting: "", classroomNumber: "", timeId: "" });


    const token = localStorage.token;

    async function GetRequests(searchParams){

        const {timeId, statuses, classroomNumber, sorting } = searchParams;
        let number = ""
        if (classroomNumber.length > 0) {
            number = `&classroomNumber=${classroomNumber}`
        }
        let time = "";
        if (timeId.length > 0) {
            time = `&timeId=${timeId}`
        }
        let sort = "";
        console.log(sorting)
        if (sorting.length > 0) {
            sort = `&sorting=${sorting}`
        }
        let stat = "";
        // if (statuses.length > 0) {
        //     stat = `&statuses=${statuses}`
        // }

        const response = await fetch(`http://89.111.174.112:8181/request/getRequests?size=150${number}${time}${sort}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },


        });

        if (response.status === 400) {
            return [];
        }
        return response.json();
    }

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                const requests = await GetRequests(searchParams);
                setData(requests);
                setIsLoaded(true);
                setUpdated(false);
            };
            fetchData();
        }

    }, [updated, searchParams])

    if (data.length === 0) {
        return (
            <Container>
                <RequestFilter searchParams={searchParams} setSearchParams={setSearchParams} setUpdated={setUpdated}/>
                <h3 className="text-center">Нет заявок</h3>
            </Container>

        )
    }


    if (isLoaded) {
        return (
            <Container>
                <RequestFilter searchParams={searchParams} setSearchParams={setSearchParams} setUpdated={setUpdated}/>
                <RequestList requests={data.requests} updated={updated}/>
            </Container>
        );
    }


};

export default RequestsPage;