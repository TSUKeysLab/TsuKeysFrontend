import React, {useEffect, useState} from 'react';
import Key from "./key";
import KeysList from "./keysList";
import AddNewKeyButton from "./addNewKeyButton";
import {Container} from "react-bootstrap";
import KeysFilter from "./keysFilter";

const KeysPage = () => {

    const [updated, setUpdated] = useState(true)
    const [searchParams, setSearchParams] = useState({ owned: false, classroomNumber: "" });


    const token = localStorage.token;

    async function GetKeys(searchParams){

        const {owned, classroomNumber} = searchParams;
        let number = ""

        if (classroomNumber.length > 0) {
            number = `&classroomNumber=${classroomNumber}`
        }

        const response = await fetch(`http://89.111.174.112:8181/key?owned=${owned}${number}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                const keys = await GetKeys(searchParams);
                setData(keys);
                setIsLoaded(true);
            };


            fetchData();
        }
        setUpdated(false);

    }, [updated, searchParams])

    if (isLoaded) {
    return (
        <Container>
            <AddNewKeyButton setUpdated={setUpdated}/>
            <KeysFilter searchParams={searchParams} setSearchParams={setSearchParams} setUpdated={setUpdated}/>
            <KeysList keys={data}/>
        </Container>
    );
    }
};

export default KeysPage;