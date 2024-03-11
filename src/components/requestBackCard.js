import React, { useState, useEffect } from "react";
import {Accordion,  Container, Card, CardBody, CardHeader, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap';
import { UsersFeedFetch,RequestsFeedFetch,RejectRequestFetch,ApproveRequestFetch } from "../requests/requestsMetods";
import { useNavigate } from "react-router-dom";

export default  function RequestBackCard(props) {
    const { requestId,keyOwnerFullName,classroomNumber, status} = props;
    
    debugger
    const [isChecked,setIsChecked]=useState(false)

    

    const handleApprove=async(e)=>{
        const baseUrl = 'http://89.111.174.112:8181/key/accept/request/'+requestId
        const response=await ApproveRequestFetch(baseUrl,localStorage.getItem('token'))
        
        if(response.status===200){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
        
        
        
    }
    
    const handleEnd=async(e)=>{
        const baseUrl = 'http://89.111.174.112:8181/key/confirm/getting/'+requestId
        const response=await RejectRequestFetch(baseUrl,localStorage.getItem('token'))
        
        if(response.status===200){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
        
        
        
    }
    
    return (
        !isChecked &&(
                <Container className="mt-2">
                <Card>
                    <CardHeader className="text-start">
                        
                        Заявка на возврат ключа от аудитории {classroomNumber}
                        
                        {status==='Approved' && (
                            <Button className="border-0 float-end" style={{backgroundColor: '#77DD77'}}>Одобрена</Button>
                        )}
                        {status==='Rejected' && (
                            <Button className="border-0 float-end" style={{backgroundColor: '#FF6961'}}>Отклонена</Button> 
                        )}
                        {/* {status==='Ended' && (
                            <Button className="border-0 float-end bg-secondary ">Завершена</Button> 
                        )} */}
                        
                        
                    </CardHeader>
                    <CardBody className="row">
                        <div className="col-md-4 text-start">Пользователь: {keyOwnerFullName}</div>
                        <div className="col-md-8 text-end">
                            {status==='Pending' && (
                                <>
  
                                    <Button className="border-0" style={{backgroundColor: '#77DD77'}} onClick={handleApprove}>Принять</Button>
                                </>
                            )}
                            {status==='Approved' && (
                                <>
                                    <Button className="border-0 bg-secondary"onClick={handleEnd}>Завершить</Button>
                                </>
                            )}
                            
                        </div>
                        
                    </CardBody>
                </Card>
            </Container>
        )
        
    );
}
