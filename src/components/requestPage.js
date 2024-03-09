import React, { useState, useEffect } from "react";
import {Accordion,  Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button, CardTitle } from 'react-bootstrap';
import { UsersFeedFetch,RequestsFeedFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import RequestCard from "./requestCard";
export default  function UsersPage() {

    const baseUrl = 'http://89.111.174.112:8181/request/getRequests?';

    const [requests, setRequests] = useState([]);
    const [numCab,setNumCab ] = useState('');
    const [flag, setFlag]=useState(true)

    useEffect(() => {
        fetchData();
    }, [numCab]);

    const fetchData = async () => {
        let url = baseUrl;
        url += 'page=1&size=100';
        if (numCab !== '') {
            url += '&classroomNumber=' + numCab
        }
        
        const data = await RequestsFeedFetch(url, localStorage.getItem('token'));
        
        // debugger

        if(!data.requests){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
        // debugger
        setRequests(data.requests);
        
    };
    // const data=fetchData(baseUrl)
    // fetchData()
    
    const renderRequestsByStatus = (status) => {
        if(flag===true){
            return requests
            .filter(request => request.status == status)
            .map(request => (
                <RequestCard
                    key={request.id}
                    id={request.id}
                    startTime={request.startTime}
                    endTime={request.endTime}
                    fullname={request.fullname}
                    classroomNumber={request.classroomNumber}
                    dateOfBooking={request.dateOfBooking}
                    status={request.status}
                />
            ));
        }
        else{
            return <span className="fw-bold text-danger fs-5">Заявок нет</span>

        }
        
    };

    const handleNumChange = (e) => {
        setNumCab(e.target.value);
    };

    return (
        <Container className="" style={{ marginTop: '110px' }}>
            <Card>
                <CardHeader>Фильтры</CardHeader>
                <CardBody className="row">
                    <FormGroup className="col-md-3">
                        <FormControl placeholder="Номер аудитории" type="number" value={numCab} onChange={handleNumChange}></FormControl>
                    </FormGroup>
                    
                </CardBody>
            </Card>



            <Accordion defaultActiveKey="0" className="mt-2">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Необработанные заявки</Accordion.Header>
                    <Accordion.Body className="text-center">
                        {renderRequestsByStatus("Pending")}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Одобренные заявки</Accordion.Header>
                    <Accordion.Body className="text-center">
                        {renderRequestsByStatus("Approved")}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Отклоненные заявки</Accordion.Header>
                    <Accordion.Body className="text-center">
                        {renderRequestsByStatus("Rejected")}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
