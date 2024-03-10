import React, { useState, useEffect } from "react";
import {Accordion,FormCheck,  Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button, CardTitle } from 'react-bootstrap';
import { UsersFeedFetch,RequestsFeedFetch,RequestsBackFeedFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";
import RequestCard from "./requestCard";
import RequestBackCard from "./requestBackCard";
export default  function UsersPage() {

    const baseUrl = 'http://89.111.174.112:8181/request/getRequests?';
    
    const [requests, setRequests] = useState([]);
    const [numCab,setNumCab ] = useState('');
    const [flag, setFlag]=useState(true)
    const [selectedOption, setSelectedOption] = useState('defReq');

    useEffect(() => {
        fetchData();
    }, [numCab]);

    const fetchData = async () => {
        if(selectedOption==='defReq'){
            let url = baseUrl;
            url += 'page=1&size=100';
            if (numCab !== '') {
                url += '&classroomNumber=' + numCab
            }
            
            const data = await RequestsFeedFetch(url, localStorage.getItem('token'));
            
            // debugger

            if(!data.requests){
                setFlag(true)
            }
            else{
                setFlag(true)
                setRequests(data.requests);
            }
        }
        else{
            let url='http://89.111.174.112:8181/key/requests/dean'
            const data=await RequestsBackFeedFetch(url, localStorage.getItem('token'))
            if(data.length>0){
                setRequests(data.requests);
                setFlag(true)
            }
            else{
                setFlag(true)
            }
        }
        
        // debugger
        
        
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
    const renderBackRequestsByStatus = (status) => {
        if(flag===true){
            return requests
            .filter(request => request.status == status)
            .map(request => (
                
                <RequestBackCard
                    key={request.requestId}
                    id={request.requestId}
                    keyOwnerFullName={request.keyOwnerFullName}
                    classroomNumber={request.classroomNumber}
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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    console.log(requests, selectedOption)
    return (
        <Container className="" style={{ marginTop: '110px' }}>
            <Card>
                <CardHeader>Фильтры</CardHeader>
                <CardBody className="row">
                    {selectedOption==='defReq' ?(
                    <FormGroup className="col-md-3">
                        <FormControl placeholder="Номер аудитории"  value={numCab} onChange={handleNumChange}></FormControl>
                    </FormGroup>) :(
                        <></>
                        // <div className="col-md-3"></div>
                    )}
                    
                    <FormGroup className="col-md-9 d-flex align-items-center ">
                        <div>
                            <FormCheck
                                inline
                                type="radio"
                                label="Заявки на бронирование"
                                name="filter"
                                value="defReq"
                                checked={selectedOption === 'defReq'}
                                onChange={handleOptionChange}
                            />
                            <FormCheck
                                inline
                                type="radio"
                                label="Заявки на возврат ключей"
                                name="filter"
                                value="backReq"
                                checked={selectedOption === 'backReq'}
                                onChange={handleOptionChange}
                            />
                        </div>
                    </FormGroup>
                </CardBody>
            </Card>


            {selectedOption==='defReq' ? (
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
            ) : (
                <Accordion defaultActiveKey="0" className="mt-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Необработанные заявки</Accordion.Header>
                        <Accordion.Body className="text-center">
                            {renderBackRequestsByStatus("Pending")}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Одобренные заявки</Accordion.Header>
                        <Accordion.Body className="text-center">
                            {renderBackRequestsByStatus("Approved")}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Отклоненные заявки</Accordion.Header>
                        <Accordion.Body className="text-center">
                            {renderBackRequestsByStatus("Rejected")}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Завершенные заявки</Accordion.Header>
                        <Accordion.Body className="text-center">
                            {renderBackRequestsByStatus("Ended")}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
            
        </Container>
    );
}
