import React, { useState, useEffect } from "react";
import {Accordion,  Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';
import { UsersFeedFetch,RequestsFeedFetch,RejectRequestFetch,ApproveRequestFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";

export default  function RequestCard(props) {
    const { id, startTime, endTime, fullname,classroomNumber,dateOfBooking, status} = props;
    
    const [isChecked,setIsChecked]=useState(false)

    

    const handleApprove=async(e)=>{
        const baseUrl = 'http://89.111.174.112:8181/request/approve?RequestId='+id
        const response=await ApproveRequestFetch(baseUrl,localStorage.getItem('token'))
        
        if(response.status===200){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
        
        // console.log(isChecked)
        // debugger
        
    }
    const handleReject=async(e)=>{
        const baseUrl = 'http://89.111.174.112:8181/request/reject?RequestId='+id
        const response=await RejectRequestFetch(baseUrl,localStorage.getItem('token'))
        
        if(response.status===200){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
        
        // console.log(isChecked)
        // debugger
        
    }


    return (
        !isChecked &&(
                <Container className="mt-2">
                <Card>
                    <CardHeader className="text-start">
                        
                        Бронирование от {dateOfBooking} {startTime} - {endTime}

                        
                        
                        {status==='Approved' && (
                            <Button className="border-0 float-end" style={{backgroundColor: '#77DD77'}}>Одобрена</Button>
                        )}
                        {status==='Rejected' && (
                            <Button className="border-0 float-end" style={{backgroundColor: '#FF6961'}}>Отклонена</Button> 
                        )}
                        
                        
                    </CardHeader>
                    <CardBody className="row">
                        <div className="col-md-4 text-start">Пользователь: {fullname}</div>
                        <div className="col-md-4 text-start">Номер аудитории: {classroomNumber}</div>
                        <div className="col-md-3 text-start">
                            {status==='Pending' && (
                                <>
                                    <Button className="me-2 border-0" style={{backgroundColor: '#FF6961'}}onClick={handleReject}>Отклонить</Button> 
                                    <Button className="border-0" style={{backgroundColor: '#77DD77'}} onClick={handleApprove}>Одобрить</Button>
                                </>
                            )}
                            {status==='Approved' && (
                                <>
                                    <Button className="border-0" style={{backgroundColor: '#FF6961'}} onClick={handleReject}>Отклонить</Button>
                                </>
                            )}
                            {status==='Rejected' && (
                                <>
                                    <Button className="border-0" style={{backgroundColor: '#77DD77'}} onClick={handleApprove}>Одобрить</Button> 
                                </>
                            )}
                        </div>
                        
                    </CardBody>
                </Card>
            </Container>
        )
        
    );
}
